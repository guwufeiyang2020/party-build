<template>
	<view class="logo-wrapper">
		<view class="logo-img">
			<image src="../../static/images/logo-login.png" mode="widthFix" />
		</view>
		<view class="form-box">
			<view class="form-item">
				<view class="icon-box">
					<i class="iconfont icon-yonghu"></i>
				</view>
				<input class="ipt" v-model="username" type="text" placeholder="用户名" />
			</view>
			<view class="form-item">
				<view class="icon-box">
					<i class="iconfont icon-mima"></i>
				</view>
				<input class="ipt" v-model="password" type="password" placeholder="密码" />
			</view>
			<view class="form-item">
				<view class="icon-box">
					<i class="iconfont icon-yanzhengma"></i>
				</view>
				<input class="ipt short" v-model="capCode" type="text" placeholder="验证码" />
				<canvas class="canvas" canvas-id="yzmCanvas" id="yzmCanvas" @tap="tapCaptcha"></canvas>
			</view>
			<button class="btn-login" @tap="login">登录</button>
		</view>
		<view class="bottom-img">
			<image src="../../static/images/login-bottom.png" mode="widthFix" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				capShow: true,
				username: '',
				password: '',
				capCode: '',
				uuid: ''
			}
		},
		methods: {
			async queryCaptcha() {
				const { data } = await this.$http({
					url: '/captchaImage',
					method: 'GET',
				});
				this.uuid = data.data.uuid;
				this.creatCanvas(data.data.image);
			},
			tapCaptcha() {
				this.capShow = false;
				this.$nextTick(() => {
					this.capShow = true;
					this.queryCaptcha();
				});
			},
			//得到随机的颜色值
			randomColor() {
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);	
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			},
			creatCanvas(str) {
				const ctx = uni.createCanvasContext('yzmCanvas');
				ctx.setFontSize(28 + Math.floor(Math.random() * 4 - 2));
				ctx.setFillStyle(this.randomColor());
				for (let i = 0; i < 4; i++) {
					ctx.setFontSize(28 + Math.floor(Math.random() * 4 - 2));
					ctx.fillText(str[i], 20 * i + 10, 32);
					ctx.setFillStyle(this.randomColor());
					// 旋转随机在-3到3之间
					ctx.rotate((Math.floor(Math.random() * 6 - 3) * Math.PI) / 180);
				}
				// 直线 begin path
				for (let i = 0; i < 4; i++) {
					ctx.beginPath();
					ctx.setStrokeStyle(this.randomColor());
					// x/-10~110 y/-10~50
					ctx.moveTo(
					  Math.floor(Math.random() * 100) + Math.floor(Math.random() * 20 - 10),
					  Math.floor(Math.random() * 40) + Math.floor(Math.random() * 20 - 10)
					);
					ctx.lineTo(
					  Math.floor(Math.random() * 100) + Math.floor(Math.random() * 20 - 10),
					  Math.floor(Math.random() * 40) + Math.floor(Math.random() * 20 - 10)
					);
					ctx.stroke();
				 }
				ctx.draw();
			},
			async login() {
				if(this.username === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写用户名'
					});
					return;
				}
				if(this.password === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写密码'
					});
					return;
				}
				if(this.capCode === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写验证码'
					});
					return;
				}
				const { data } = await this.$http({
					url: '/login',
					method: 'POST',
					data: {
						username: this.username,
						password: this.password,
						code: this.capCode,
						uuid: this.uuid
					}
				});
				if(data.code === 200) {
					uni.setStorageSync('token', data.data.token);
					const res = await this.$http({
						url: '/personal/userInfo',
						method: 'GET',
						data: {
							token: data.data.token,
						}
					});
					let userInfo = res.data.data;
					uni.setStorageSync('userInfo', userInfo);
					
					uni.switchTab({
					    url: '/pages/index/index'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: data.msg
					});
				}
			}
		},
		onLoad() {
			this.queryCaptcha();
		},
	}
</script>

<style lang="scss">
.logo-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.logo-img {
	width: 590upx;
	height: 246upx;
	margin-top: 60upx;
}
.form-box {
	width: 560upx;
	height: 580upx;
	margin: 30upx 0 140upx 0;
}
.form-item {
	width: 100%;
	height: 82upx;
	margin-top: 48upx;
	border-bottom: 1px solid #c1c1c1;
	display: flex;
	align-items: center;
}
.icon-box {
	width: 50upx;
	height: 50upx;
	border-radius: 50%;
	margin-right: 40upx;
	text-align: center;
	line-height: 42upx;
	background-color: #f0443c;
	color: #fff;
	i {
		font-size: 24upx;
	}
}
.ipt {
	flex: 1;
	height: 80upx;
}
.canvas {
	width: 190upx; 
	height: 68upx;
	border: 1px solid #f1f1f1;
	background: #fdfdfd;
}
.btn-login {
	margin-top: 84upx;
	background-color: #f0443c;
	color: #fff;
	line-height: 50px;
	// border-radius: 25px;
}
.bottom-img {
	width: 628upx;
	height: 124upx;
}
</style>
