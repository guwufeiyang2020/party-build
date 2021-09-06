<template>
	<view class="box">
		<view class="title">党委延期换届申请</view>
		<view class="uni-form">
			<view class="uni-form-item">
				 <view class="label">党组织名称</view>
				 <view class="content">{{ leaveInfo.orgName }}</view>
			</view>
			<view class="uni-form-item">
				<view class="label">是否延期</view>
				<view class="content">
					<label class="radio">
						<radio 
							value="1" 
							:disabled="true"
							:checked="isDelay==='Y'" 
							@tap="changeIsDelay('Y')"  
							color="#f0443c" 
							style="transform: scale(0.8)"/>
						是
					</label>
					<label class="radio">
						<radio value="2" 
							:checked="isDelay==='N'" 
							@tap="changeIsDelay('N')" 
							:disabled="true" 
							color="#f0443c" 
							style="transform: scale(0.8)"/>
						否
					</label>
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">延期天数</view>
				<view class="content">{{ leaveInfo.delayDay }}天</view>
			</view>
			 <view class="uni-form-item">
				<view class="label">延期原因</view>
				<view class="content">{{ leaveInfo.delayReason }}</view>
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
				isDelay: 'Y',
				url: '',
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
				this.isDelay = this.leaveInfo.isDelay;
			},
			changeIsDelay(e) {
				return;
				this.isDelay = e;
			},
			async submit(type) {
				console.log('type', type);
				let auditType = type === 'reject' ? 3 : 2 ; // 2:通过，3:驳回
				const { data } = await this.$http({
					url: `/party/committee/change/delay/audit/${this.dataId}/${this.todoId}/${auditType}`,
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
					}, 1500);
				
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
			.radio {
				margin-right: 60upx;
			}
		}
	}
	.btn-box {
		display: flex;
		margin-top: 80upx;
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

