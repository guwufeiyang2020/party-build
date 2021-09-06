<template>
	<view>
		<view class="tab-list-box">
			<view class="tab-list">
				<view 
					:class="['tab-item', reqFlag === item.type ? 'active': '']"
					v-for="(item, index) in tabList" 
					:key="index" 
					@tap="changeTab(item)">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 待参加 -->
		<view class="tab-content-box">
			<view class="tab-content-list" v-if="shareList && shareList.length > 0">
				<view class="tab-content-item" v-for="item in shareList" :key="item.id">
					<view class="content-left">
						<view class="name">{{item.title}}</view>
						<view class="time">{{item.activityTime}}</view>
						<view class="address">{{item.place}}</view>
					</view>
					<view class="content-right">
						<template v-if="reqFlag === 1">
							<view class="btn-share" @tap="toUpload(item)">
								<i class="iconfont icon-fenxiang"></i>
							</view>
						</template>
						<template v-if="reqFlag === 2">
							<button class="btn-view" @tap="viewPic(item)">
								<i class="iconfont icon-chakan"></i>
								查看
							</button>
						</template>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
			<view class="is-end" v-if="isEnd">我是有底线的</view>
		</view>
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
				tabList: [{
					title: '待分享',
					type: 1
				}, {
					title: '已分享',
					type: 2
				}],
				shareList: [],
				isEnd: false,
				pageNum: 1,
				reqFlag: 1,
				uploadMode: ''
			}
		},
		computed: {
		    isNoData() {
				return this.shareList && this.shareList.length > 0;
		    }
		  },
		onLoad(options) {
			this.uploadMode = options.uploadMode;
		},
		onShow() {
			if(this.uploadMode === 'add') {
				this.reqFlag = 2;
			} else {
				this.reqFlag = 1;
			}
			this.isEnd = false;
			this.shareList = [];
			this.pageNum = 1;
			this.queryShareList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh(); // 停止当前页面下拉刷新
				this.shareList = [];
				this.pageNum = 1;
				this.queryShareList();
			}, 1000);
		},
		// 上拉加载下一页
		onReachBottom() {
			if(this.pageNum * 5 >= this.total) {
				this.isEnd = true;
				return;
			}
			this.pageNum++;
			this.queryShareList();
		},
		methods: {
			async queryShareList() {
				const { data } = await this.$http({
					url: '/share/toBeShareList',
					data: {
						pageNum: this.pageNum,
						pageSize: 5,
						reqFlag: this.reqFlag
					}
				});
				this.total = data.data.total;
				this.shareList = this.shareList.concat(data.data.rows);
			},
			changeTab(item) {
				this.isEnd = false;
				this.pageNum = 1;
				this.shareList = [];
				this.reqFlag = item.type;
				this.queryShareList();
			},
			toUpload(item) {
				uni.navigateTo({
				    url: '/pages/upload/upload?id='+ item.id +"&dataType=" + item.dataType +"&mode=" + 'add'
				});
			},
			viewPic(item) {
				uni.navigateTo({
				    url: '/pages/upload/upload?id='+ item.id +"&dataType=" + item.dataType +"&mode=" + 'view'
				});
			}
		}
	}
</script>

<style lang="scss">
.tab-content-item {
	width: 100%;
	height: 270upx;
	border-bottom: 1px solid #e7eaf0;
	padding-top: 46upx;
	display: flex;
	justify-content: space-between;
}
.content-left .name {
	line-height: 72upx;
	font-size: 18px;
	font-weight: bold;
	color: #191919;
}
.content-left .time {
	line-height: 40upx;
	font-size: 13px;
	color: #aab2bf;
}
.content-left .address {
	line-height: 48upx;
	font-size: 13px;
	color: #333;
}
uni-button:after {
	border: 0;
}
.content-right {
	padding-top: 20upx;
}
.content-right .share-box {
	width: 164upx;
	height: 164upx;
	border-radius: 50upx;
	// border: 1px solid #bec0c5;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}	
.btn-share {
	width: 92upx;
	height: 92upx;
	border-radius: 50upx;
	margin-bottom: 10upx;
	background-color: #fe5c14;
	// box-shadow: 0px 3px 5px 2px rgba(255, 92, 20, 0.2);
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn-share i {
	font-size: 18px;
}

.content-right .btn-view {
	width: 169upx;
	height: 64upx;
	font-size: 12px;
	border-radius: 32upx;
	background-color: #fe935e;
	border: 1px solid #fe935e;
	box-shadow: 0px 3px 3px 1px rgba(254, 147, 94, 0.2);
	color: #fff;
	display: flex;
	align-items: center;
	i {
		font-size: 12px;
		margin-right: 10upx;
	}
}
</style>
