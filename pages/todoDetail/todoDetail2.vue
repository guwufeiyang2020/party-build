<template>
	<view class="box">
		<view class="title">党建翼联对象</view>
		<view class="uni-form">
			<view class="uni-form-item">
				 <view class="label">党组织名称</view>
				 <view class="content">{{deatailInfo.unitOrgName}}</view>
			</view>
			<view class="uni-form-item">
				<view class="label">结对类型</view>
				<view class="content">
					{{deatailInfo.pairType}}
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">对象名称</view>
				<view class="content">
					{{deatailInfo.objName}}
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">对象类型</view>
				<view class="content">
					{{deatailInfo.objType}}
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">签约时间</view>
				<view class="content">
					{{deatailInfo.firstSignTime}}
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">签约书</view>
				<view class="content"
					@tap="toViewFile(item)"
					v-for="item in deatailInfo.singleFile" 
					:key="item.dataId">
					<i class="iconfont icon-pdf"></i>
					<text class="file-pdf">{{item.fileName}}</text>
				</view>
			</view>
			
		</view>
		<view class="btn-box" v-if="todoStatus === '1'">
			<button class="btn-reject" @tap="submit('reject')">驳回</button>
			<button class="btn-adopt" @tap="submit('adopt')">通过</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				dataId: '',
				todoId: '',
				todoStatus: '',
				deatailInfo: {},
				baseUrl: getApp().globalData.BASE_URL,
			}
		},
		onLoad(option) {
			this.url = option.url;
			this.dataId = option.dataId;
			this.todoId = option.todoId;
			this.todoStatus = option.todoStatus;  // 1待处理  2 已处理
			this.queryInfo();
		},
		methods: {
			// 预览pdf
			toViewFile(item) {
				let fileUrl = `${this.baseUrl}/share/downloadFile?filePath=${item.filePath}&fileName=${item.fileName}`;
				uni.navigateTo({
				    url: '/pages/webView/webView?fileUrl='+ encodeURIComponent(fileUrl)
				});
			},
			async queryInfo() {
				const { data } = await this.$http({
					url: `/${this.url}`,
					method: 'GET'
				});
				this.deatailInfo = data.data;
			},
			async submit(type) {
				let auditType = type === 'reject' ? 3 : 2 ; // 2:通过，3:驳回
				const { data } = await this.$http({
					url: `/party/wing/obj/audit/${this.dataId}/${this.todoId}/${auditType}`,
					method: 'GET'
				});
				if (data.code === 200) {
					uni.showToast({
						title: data.msg
					});
					setTimeout(()=> {
						uni.redirectTo({
						    url: '/pages/todoList/todoList'
						});
					}, 2000);
				};
			}
		}
	}
</script>

<style lang="scss">
.box {
	padding: 30upx;
	.title {
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		font-weight: bold;
		color: #000;
	}
	.uni-form {
		.uni-form-item {
			padding: 30upx 0;
			border-bottom: 1px solid #e7eaf0;
		}
		.label {
			height: 60upx;
			line-height: 60upx;
			font-size: 14px;
			color: #828282;
		}
		.content {
			margin-top: 6upx;
			font-size: 14px;
			line-height: 46upx;
			color: #313742;
			&.img-list {
				display: flex;
			}
			.img-item {
				width: 250upx;
				height: 320upx;
				margin-right: 24upx;
			}
			.img-wrapper {
				width: 250upx;
				height: 250upx;
				border: 1px solid #d6d6d6;
			}
			.text-area {
				line-height: 60upx;
				color: #484b50;
			}
			.icon-pdf {
				color: #fa5961;
				margin-right: 6upx;
			}
			.file-pdf {
				color: #4376e3;
				text-decoration: underline;
			}
		}
	}
	.btn-box {
		display: flex;
		margin: 80upx 0;
		button {
			flex: 1;
			background: #fff;
			border-radius: 5px;
			border: 1px solid #f0443c;
			color: #f0443c;
		}
		.btn-reject {
			margin-right: 15upx;
		}
		.btn-adopt {
			margin-left: 15upx;
			background: #f0443c;
			border: 1px solid #f0443c;
			color: #fff;
		}
	}
}
</style>
