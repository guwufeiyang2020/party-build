<template>
	<view class="box">
		<view class="title">党委延期换届确认</view>
		<view class="uni-form">
			<view class="uni-form-item">
				 <view class="label">党组织名称</view>
				 <view class="content">{{ leaveInfo.orgName }}</view>
			</view>
			<view class="uni-form-item">
				<view class="label">是否延期</view>
				<view class="content">
					<view :class="{'gray-wrapper': todoStatus === '1'}">
						<label class="radio">
							<radio 
								value="1" 
								:disabled="todoStatus === '1' ?  false: true"
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
								:disabled="todoStatus === '1' ?  false: true"
								color="#f0443c" 
								style="transform: scale(0.8)"/>
							否
						</label>
					</view>
				</view>
			</view>
			<view class="uni-form-item">
				<view class="label">延期天数</view>
				<view class="content"> 
					<view class="gray-wrapper" v-if="todoStatus === '1'">
						<input  type="text" v-model="delayDay" placeholder="请输入天数" placeholder-style="color:#ccc" />
					</view>
					<view v-else>{{leaveInfo.delayDay}}</view>
				</view>
			</view>
			 <view class="uni-form-item">
				<view class="label">延期原因</view>
				<view class="content">
					<view class="gray-wrapper" v-if="todoStatus === '1'">
						<textarea v-model="delayReason" placeholder-style="color:#ccc" placeholder="请输入延期原因" />
					</view>
					<view v-else>{{leaveInfo.delayReason}}</view>
				</view>
			 </view>	 
		</view>
		<view class="btn-box" v-if="todoStatus === '1'">
			<button class="btn-adopt" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDelay: '',
				url: '',
				todoStatus: '',
				delayDay: '',
				delayReason: '',
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
				
				if(this.todoStatus === '2') {
					this.isDelay = this.leaveInfo.isDelay;
					this.delayDay = this.leaveInfo.delayDay;
					this.delayReason = this.leaveInfo.delayReason;
				}
			},
			changeIsDelay(e) {
				if(this.todoStatus === '1') {
					this.isDelay = e;
				} else {
					return false;
				}
				
			},
			async submit() {
				const { data } = await this.$http({
					url: `/party/committee/change/delay/submit`,
					method: 'POST',
					data: {
						id: this.dataId,
						todoId: this.todoId,
						orgName: this.leaveInfo.orgName,
						isDelay: this.isDelay,
						delayDay: this.delayDay,
						delayReason: this.delayReason
					}
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
			.radio {
				margin-right: 60upx;
			}
			input, textarea {
				font-size: 14px;
			}
			.gray-wrapper {
				background-color: #f5f6f9;
				padding: 24upx;
				border-radius: 8upx;
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


