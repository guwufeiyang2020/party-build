<template>
	<view class="sign-success-box">
		<view class="sign-content">
			<view class="sign-success-img">
				<image src="../../static/images/sign-fail-img.png" mode="widthFix" />
			</view> 
			<view class="success-text">签到失败</view>
			<view class="back-list" @click="backToList">
				<i class="iconfont icon-fanhui"></i>
				<text class="text">返回签到页</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			backToList() {
				uni.redirectTo({
					url: '/pages/sign/sign'
				});
			}
		}
	}
</script>

<style lang="scss">
.sign-success-box {
	height: calc(100vh - var(--status-bar-height));
	background-color: #da2a2a;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sign-content {
	position: relative;
	width: 630upx;
	height: 366upx;
	margin-top: -160upx;
	background-color: #fff;
	padding: 228upx 40upx 0;
	border-radius: 20upx;
}
.sign-success-img {
	position: absolute;
	left: 80upx;
	top: -257upx;
	width: 504upx;
	height: 402upx;
}
.success-text {
	width: 100%;
	border-top: 1px dashed #e7eaf0;
	font-size: 18px;
	color: #000;
	text-align: center;
	line-height: 138upx;
}
.back-list {
	line-height: 80upx;
	color: #fff;
	text-align: center;
	.text {
		text-decoration: underline;
	}
}
</style>
