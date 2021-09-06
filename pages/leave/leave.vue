<template>
	<view>
		<view class="label">请假说明</view>
		<view class="textarea-box">
			<textarea
				v-model="reason"
				:maxlength="200" 
				class="textarea" 
				@input="inputReason" 
				placeholder-style="color:#aab2bf" 
				placeholder="输入请假原因..." />
				<p class="text-tip">{{ reason.length }}/200</p>
		</view>
		<button class="btn-submit" @tap="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason: '',
				id: 0,
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		methods: {
			inputReason(e){
				this.reason = e.detail.value;
			},
			async submit() {
				if(this.reason === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写请假原因'
					});
					return;
				}
				const { data } = await this.$http({
					url: '/checkin/submitLeave',
					method: 'GET',
					data: {
						actId: this.id,
						reason: this.reason
					}
				});
				if (data.code === 200) {
					uni.showToast({
						title: data.msg
					});
					uni.navigateBack({
					    delta: 1
					});
				};
			}
		}
	}
</script>

<style lang="scss">
.label {
	margin-top: 18upx;
	line-height: 90upx;
	font-size: 14px;
	color: #191919;
	font-weight: bold;
	padding-left: 40upx;
}
.textarea-box {
	position: relative;
	width: 690upx;
	height: 400upx;
	margin: 0 auto;
}
.text-tip {
	position: absolute;
	right: 20upx;
	bottom: 20upx;
	font-size: 14px;
	color: #aab2bf;
}
.textarea {
	width: 100%;
	height: 100%;
	border-radius: 10upx;
	padding: 20upx;
	background-color: #f5f6f9;
	font-size: 14px;
	color: #313742;
}
.btn-submit {
	width: 690upx;
	margin: 50upx auto;
	background-color: #f0443c;
	color: #fff;
	line-height: 50px;
	margin-top: 40px;
	border-radius: 25px;
}
</style>
