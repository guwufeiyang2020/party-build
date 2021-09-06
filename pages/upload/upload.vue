<template>
	<view>
		<view class="img-box">
			<view class="img-list" >
				<view class="img-item"
					v-for="item in imgList" 
					:key='item' 
					@tap="previewImg(item)">
					<image style="width: 100%; height: 100%;" :src="item"></image>
					<view @click.stop="delImg(item)" class="delect-area" v-if="mode === 'add'">
						<i class="iconfont icon-lajitong"></i>
					</view>
				</view>
			</view>
			<no-data text="暂无图片" v-if="mode==='view' && imgList && imgList.length === 0"></no-data>
			
			<view class="camera" @tap="chooseImage" v-if="mode === 'add'">
				<i class="iconfont icon-untitled44"></i>
			</view>
		</view>
		<button class="btn-submit" @tap="submit" v-if="mode === 'add'">提交</button>
	</view>
</template>

<script>
	import NoData from '../../components/NoData.vue';
	export default {
		components: {
			NoData
		},
		data() {
			return {
				imgList: [],
				baseUrl: getApp().globalData.BASE_URL,
				id: '',
				dataType: '',
				mode: '',
				temImgUrlList: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.dataType = options.dataType;
			this.mode = options.mode;
			if (this.mode === 'view') {
				this.queryImgList();
			}
		},
		methods: {
			// 获取图片url列表
			async queryImgList() {
				const { data } = await this.$http({
					url: '/share/getImageUrlList',
					method: 'GET',
					data: {
						dataId: this.id,
						dataType: this.dataType
					}
				});
				this.imgList = data.data.map(path => {
					return `${this.baseUrl}/share/downloadFile?${path}`
				}); 
			},
			chooseImage() {
				uni.chooseImage({
				    count: 4, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 从相册选择和拍照
				    success: res => {
				        // tepFliePaths 保存图片路径 
						let tempFilePaths = res.tempFilePaths;
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(tempFilePaths);
						} else {
							this.imgList = tempFilePaths;
						}
				    }
				});
			},
			
			//上传到服务器
			submit() {
				uni.showLoading({
					title: '上传中...',
					mask: false
				});
				for(let i = 0; i < this.imgList.length; i++) {  
					let path = this.imgList[i];
					uni.uploadFile({
						url: `${this.baseUrl}/share/uploadImage`,   //后端用于处理图片并返回图片地址的接口
						filePath: path,
						formData: {
							dataId: this.id,
							dataType: this.dataType
						},
						header: {
							Authorization: uni.getStorageSync('token')
						},
						name: 'imageFile',
						success: res => {
							uni.hideLoading();
							let data = JSON.parse(res.data);   //返回的是字符串，需要转成对象格式
							if(data.code === 200) {
								uni.showToast({
									title: '图片上传成功'
								});
								this.$http({
									url: '/share/submit',
									method: 'GET',
									data: {
										dataId: this.id,
										dataType: this.dataType
									}
								}).then(res=> {
									if (res.data.code === 200) {
										let timer = setTimeout(()=> {
											uni.redirectTo({
												url: '/pages/share/share?uploadMode=' + 'add'
											});
										}, 1500);
									} else {
										uni.showToast({
											icon:'none',
											title: res.data.msg
										});
									}
								}).catch(err => {
									uni.showToast({
										icon:'none',
										title: res.data.msg
									});
								})
							}
						},
						fail: err => {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: err.errMsg
							});
						}
					})
				}	
			},
			previewImg(current) {
				uni.previewImage({
					current: current,
					urls: this.imgList,
					loop: true,
					indicator: "number"
				})
			},
			delImg(item) {
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: (res) => {
						if (res.confirm) {
							let index = this.imgList.findIndex(value => value === item);
							this.imgList.splice(index, 1);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.img-box {
	padding: 30upx 0 0 30upx;
}
.img-item {
	float: left;
	position: relative;
	width: 216upx;
	height: 216upx;
	border-radius: 8upx;
	overflow: hidden;
	margin: 0 20upx 20upx 0;
}
.delect-area {
	position: absolute;
	right: 8upx;
	bottom: 8upx;
	width: 48upx;
	height: 48upx;
	border-radius: 4upx;
	background-color: rgba(0, 0, 0, .5);
	display: flex;
	justify-content: center;
	align-items: center;
	i {
		font-size: 16px;
		color: #fff;
	}
}
.camera {
	width: 216upx;
	height: 216upx;
	border-radius: 8upx;
	overflow: hidden;
	// margin: 0 10upx 20upx;
	text-align: center;
	line-height: 216upx;
	border: 1px dashed #b3b3b8;
	i {
		font-size: 40px;
		color: #b3b3b8;
	}
}
.btn-submit {
	width: 92%;
	margin: 40upx auto;
	background-color: #f0443c;
	color: #fff;
	line-height: 50px;
	margin-top: 40px;
	border-radius: 25px;
}
</style>
