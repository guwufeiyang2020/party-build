<template>
	<view>
		<view class="person-info">
			<view class="info-left">
				<view class="portrait-img">
					<image src="../../static/images/portrait.png" mode="widthFix" />
				</view>
				<view class="info-cont">
<<<<<<< HEAD
					<view class="name"> {{ userInfo.userName }} </view>
					<view class="company"> {{ userInfo.orgName }} </view>
					<view class="company"> {{ userInfo.partyBranchName }} </view>
=======
					<view class="name">张三</view>
					<view class="company">中国电信公司</view>
					<view class="company">第一党支部</view>
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
				</view>
			</view>
			<i class="iconfont icon-jiantou2"></i>
		</view>
		<view class="bottom-content-wrapper"> 
			<view class="bottom-content"> 
				<view class="section integral">
					<view class="icon-box">
						<image src="../../static/images/my-icon1.png"></image>
					</view>
					<view class="text">我的积分</view>
					<i class="iconfont icon-jiantou2"></i>
				</view>
				<view class="section">
					<view class="section-list">
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon2.png"></image>
							</view>
							<view class="text">我的待办</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon3.png"></image>
							</view>
							<view class="text">我的支部</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon4.png"></image>
							</view>
							<view class="text">我的党费</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon5.png"></image>
							</view>
							<view class="text">我的荣誉</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon6.png"></image>
							</view>
							<view class="text">民主评议</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
						<view class="integral section-item">
							<view class="icon-box">
								<image src="../../static/images/my-icon7.png"></image>
							</view>
							<view class="text">修改密码</view>
							<i class="iconfont icon-jiantou2"></i>
						</view>
					</view>
				</view>
<<<<<<< HEAD
				<view class="section edit" @tap="edit">
=======
				<view class="section edit">
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
					退出登录
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
<<<<<<< HEAD
				userInfo: uni.getStorageSync('userInfo')
			}
		},
		methods: {
			edit() {
				uni.clearStorageSync();
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
=======
				
			}
		},
		methods: {
			
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
		}
	}
</script>

<style lang="scss">
.person-info {
	height: 232upx;
	background: #da2a2a;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40upx 50upx;
	color: #fff;
	.info-left {
		display: flex;
		align-items: center;
	}
	.icon-jiantou2 {
		font-size: 40upx;
	}
	.portrait-img {
		width: 118upx;
		height: 118upx;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 35upx;
		border: 2px solid #fff;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.info-cont {
		flex: 1;
		.name {
			font-size: 16px;
			line-height: 54upx;
		}
		.company {
			line-height: 38upx;
			font-size: 14px;
			color: #edabab;
		}
	}
}
.bottom-content-wrapper {
	position: relative;
	padding: 0 40upx;
	.bottom-content {
		position: relative;
		top: -50upx;
		width: 100%;
	}
	.section {
		margin-bottom: 40upx;
		border-radius: 5px;
		background: #fff;
		padding: 0 30upx;
		box-shadow: 0px 0px 6px rgba(219, 219, 219, 0.5);
	}
	.integral {
		display: flex;
		align-items: center;
		height: 100upx;
		.icon-box {
			width: 36upx;
			height: 36upx;
			margin-right: 44upx;
<<<<<<< HEAD
=======
			image {
				width: 100%;
				height: 100%;
			}
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
		}
		.text {
			flex: 1;
		}
		.icon-jiantou2 {
			width: 24upx;
			color: #c6c6c6;
		}
	}
	.section-item {
		border-bottom: 1px solid #f2f2f2;
		&:last-child {
			border-bottom: 0 none;
		}
	}
	.edit {
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		color: #d70000;
	}
}

</style>
