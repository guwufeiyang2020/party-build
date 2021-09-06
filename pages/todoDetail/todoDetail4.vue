<template>
	<view class="box">
		<view class="title">请假申请</view>
		<view class="uni-form">
			<view class="uni-form-item">
				 <view class="label">请假人</view>
				 <view class="content">{{ leaveInfo.applyUserName }}</view>
			</view>
			<view class="uni-form-item">
				<view class="label">请假活动</view>
				<view class="content">{{ leaveInfo.activityTitle }}</view>
			</view>
			<view class="uni-form-item">
				<view class="label">活动时间</view>
				<view class="content">{{ leaveInfo.activityTime }}</view>
			</view>
			 <view class="uni-form-item">
				<view class="label">请假原因</view>
				<view class="content">{{ leaveInfo.leaveReason }}</view>
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
				leaveInfo: {}
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
			async queryInfo() {
				const { data } = await this.$http({
					url: `/${this.url}`,
					method: 'GET'
				});
				this.leaveInfo = data.data;
			},
			async submit(type) {
				let auditType = type === 'reject' ? 3 : 2 ; // 2:通过，3:驳回
				const { data } = await this.$http({
					url: `/party/leave/audit/${this.todoId}/${this.dataId}/${auditType}`,
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
