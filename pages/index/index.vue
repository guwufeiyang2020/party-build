<template>
	<view class="content">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper 
				class="carousel" 
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				:interval="interval" 
				:duration="duration" 
				indicator-active-color="#FFFFFF" 
				@change="swiperChange">
				<swiper-item 
					v-for="(item, index) in carouselList" 
					:key="index" 
<<<<<<< HEAD
					class="carousel-item">
=======
					class="carousel-item" 
					>
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
					<image :src="item.src" mode="widthFix" />
				</swiper-item>
			</swiper>
		</view>
<<<<<<< HEAD
		<view class="content-wrapper">
			<!-- 我的待办 -->
			<view class="notice-header">
				<h2>我的待办</h2>
				<view class="view-more" @tap="navigateTo('/pages/todoList/todoList')">
					共{{total}}条 <i class="iconfont icon-jiantou2"></i>
				</view>
			</view>
			<view class="notice-section">
				<view class="notice-list" v-if="!isEmpty">
					<view 
						v-for="(item, index) in todoList" 
						:key="item.dataId"
						class="notice-item"
						@click="navToDetailPage(item)">
						<i class="icon-dot"></i>
						<text class="text text-ellipsis">{{item.title}}</text>
					</view>
				</view>
				<view v-else class="notice-item">
					<i class="icon-dot"></i>
					<text class="text ">暂无待办</text>
				</view>
			</view>
			
			<!-- 通知公告 -->
			<view class="notice-header">
				<h2>通知公告</h2>
				<view class="view-more">
					更多 <i class="iconfont icon-jiantou2"></i>
				</view>
			</view>
			<view class="notice-section notice-section1">
=======
		
		<view class="content-wrapper">
			<!-- 通知区域 -->
			<view class="notice-section">
				<view class="notice-header">
					<h2>待办通知</h2>
					<view class="view-more">全部 <i class="iconfont icon-jiantou2"></i></view>
				</view>
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
				<view class="notice-list">
					<view 
						v-for="(item, index) in newsList" 
						:key="item.id"
						class="notice-item"
						@click="navToDetailPage(item)">
<<<<<<< HEAD
=======
						<i class="icon-dot"></i>
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
						<text class="text text-ellipsis">{{item.text}}</text>
					</view>
				</view>
			</view>
<<<<<<< HEAD
			
=======
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
			<!-- 广告区域 -->
			<view class="ada-section">
				<image src="../../static/images/ada.png" mode="widthFix" />
			</view>
			<!-- 底部区域 -->
			<view class="bottom-section">
<<<<<<< HEAD
				<view class="section-item" @tap="navigateTo('/pages/sign/sign')">
					<image src="../../static/images/bottom-img-1.png" mode="widthFix" />
				</view>
				<view class="section-item" @tap="navigateTo('/pages/evaluate/evaluate')">
					<image src="../../static/images/bottom-img-2.png" mode="widthFix" />
				</view>
				<view class="section-item" @tap="navigateTo('/pages/share/share')">
=======
				<view class="section-item">
					<image src="../../static/images/bottom-img-1.png" mode="widthFix" />
				</view>
				<view class="section-item">
					<image src="../../static/images/bottom-img-2.png" mode="widthFix" />
				</view>
				<view class="section-item">
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
					<image src="../../static/images/bottom-img-3.png" mode="widthFix" />
				</view>
				<view class="section-item">
					<image src="../../static/images/bottom-img-4.png" mode="widthFix" />
				</view>
			</view>
<<<<<<< HEAD
		</view>
		<view class="mask-wrapper" v-if="showPopup">
			<view class="mask-bg"></view>
			<view class="mask-content">
				<image src="../../static/images/birthday.png" mode="widthFix"></image>
				<view class="popup-close" @tap="closePopup">
					<image src="../../static/images/popup-close.png" mode="widthFix"></image>
				</view>
				<view class="main-text">
					<view class="title">天翼祝你政治生日快乐</view>
					<view class="name">{{birthdayName}}同志：</view>
					<view class="desc">今天是您的入党纪念日，党组织向您表示热烈的祝贺。
					希望您践行入党誓词，永葆共产党的先进本色。同时祝您身体健康，生活愉快！</view>
				</view>
			</view>
		</view>
		
		<!-- 扫码结果弹窗 -->
		<view class="mask-wrapper" v-if="showPopup1">
			<view class="mask-bg"></view>
			<view class="mask-content1">
				<image :src="computedImg" mode="widthFix"></image>
				<view class="popup-close" @tap="closePopup1">
					<image src="../../static/images/popup-close1.png" mode="widthFix"></image>
				</view>
				<view class="main-text">
					<view class="title">{{computedTitle}}</view>
					<view class="sign-time" v-if=" signType==='1' || signType==='3' || signType==='4' ">签到时间：{{signTime}}</view>
					<view class="sign-time" v-if=" signType==='2' ">会议开始前30分钟内开始签到</view>
					<view class="sign-time" v-if=" signType==='3' ">当前会议开始超过10分钟</view>
					<view class="sign-time" v-if=" signType==='4' ">当前会议开始超过30分钟</view>
					<view class="start-time">{{startTime}}</view>
				</view>
			</view>
=======
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
<<<<<<< HEAD
				showPopup: false,
				birthdayName: '',
				carouselList: [{
					src: "/static/images/banner.png",
				}, {
					src: "/static/images/banner.png",
				}, {
=======
				carouselList: [{
					src: "/static/images/banner.png",
				},
				{
					src: "/static/images/banner.png",
				},
				{
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
					src: "/static/images/banner.png",
				}],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
<<<<<<< HEAD
				todoList: [],
				total: 0,
				newsList: [{
					id: '01',
					text: '2021-05-08 三会一课总结审核'
				}, {
					id: '02',
					text: '2021-05-07 三会一课请假审核'
				}],
				isEmpty: true,
				showPopup1: false,
				signType: '1',
				signTime: '',
				startTime: '',
			}
		},
		computed: {
			computedImg() { 
				if( this.signType === '1' ) {
					return require('../../static/images/sign-result1.png')
				} else if ( this.signType === '2' ) {
					return require('../../static/images/sign-result2.png')
				} else if ( this.signType === '3' ) {
					return require('../../static/images/sign-result3.png')
				} else if ( this.signType === '4' ) {
					return require('../../static/images/sign-result4.png')
				} 
			},
			computedTitle() {
				if( this.signType === '1' ) {
					return '签到成功'
				} else if ( this.signType === '2' ) {
					return '未到签到时间'
				} else if ( this.signType === '3' ) {
					return '签到延迟'
				} else if ( this.signType === '4' ) {
					return '签到失败'
				} 
			}
		},
		onLoad() {
			this.queryTodoList();
			this.queryBirthday();
		},
		methods: {
			// 下拉刷新
			onPullDownRefresh() {
				setTimeout(() => {
					uni.stopPullDownRefresh(); // 停止当前页面下拉刷新
					this.queryTodoList();
				}, 1000);
			},
			async queryTodoList() {
				const { data } = await this.$http({
					url: '/todo/list',
					method: 'POST',
					data: {
						pageNum: this.pageNum,
						pageSize: 5,
						reqFlag: 1
					}
				});
				this.total = data.data.total;
				if(data.data.rows.length === 0) {
					this.isEmpty = true;
				} else {
					this.isEmpty = false;
					if(data.data.rows.length > 2 )  {
						this.todoList = data.data.rows.slice(0,2);
					} else {
						this.todoList = data.data.rows;
					}				
				}
			},
			onNavigationBarButtonTap(e) {
				// console.log('e', e.index);
				if(e.index === 0) {
					return;
				}
				uni.scanCode({
					success: res => {
						this.$http({
							url: '/checkin/scanSign',
							data: {
								codeInfo: res.result
							},
							method: 'GET',
							header: {
								"Content-type": "application/x-www-form-urlencoded"
							},
							sslVerify: false,
						}).then(res => {
							this.signType = res.data.msg;
							this.signTime = res.data.data.signTime;
							this.startTime = res.data.data.activityTime;
							this.showPopup1 = true;
						})
					}
				}); 
			},
			closePopup1() {
				this.showPopup1 = false;
			},
			async queryBirthday() {
				const { data } = await this.$http({
					url: '/checkin/politicBirth',
					method: 'GET',
				});
				this.birthdayName = data.data;
				if(data.msg === '1') {
					this.showPopup = true;
				}
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			swiperChange(e) {
				//console.log(e.target.value);
			},
			navToDetailPage(item) {
				//console.log(item);
			},
			closePopup() {
				this.showPopup = false;
=======
				
				newsList: [{
					id: '01',
					text: '2021-05-08 三会一课开展，请及时参加'
				}, {
					id: '02',
					text: '2021-05-07 党建翼联活动开展，请及时参加'
				}]
			}
		},
		onLoad() {
			
		},
		methods: {
			swiperChange(e) {
				console.log(e.target.value);
			},
			navToDetailPage(item) {
				console.log(item);
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
			}
		}
	}
</script>

<style lang="scss">
.carousel {
	width: 100%;
	.carousel-item {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
<<<<<<< HEAD
=======
	image {
		width: 100%;
		height: 100%;
	}
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
}
.content-wrapper {
	padding: 30upx;
	.notice-section {
		width: 100%;
<<<<<<< HEAD
		margin-bottom: 40upx;
		padding: 30upx;
		box-shadow: 0px 0px 6px rgba(219, 219, 219, 0.5);
	}
	.notice-section1 {
		border-top: 1upx solid #e7eaf0;
		box-shadow: none;
		padding: 30upx 0;
	}
=======
		height: 194upx;
		margin-bottom: 40upx;
		padding: 0 30upx;
		box-shadow: 0px 0px 6px rgba(219, 219, 219, 0.5);
	}
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
	.notice-header {
		display: flex;
		justify-content: space-between;
		height: 82upx;
		align-items: center;
		h2 {
			font-size: 30upx;
			font-weight: bold;
		}
		.view-more {
			font-size: 28upx;
			color: #aaa;
		}
	}
	.notice-item {
		font-size: 28upx;
		line-height: 38upx;
<<<<<<< HEAD
		color: #434955;
=======
		color: #888787;
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
		margin-bottom: 10upx;
		display: flex;
		align-items: center;
		.icon-dot {
			display: inline-block;
			width: 10upx;
			height: 10upx;
			border-radius: 50%;
<<<<<<< HEAD
			background: #434955;
=======
			background: #7b7a7a;
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
			margin-right: 10upx;
		}
		.text {
			flex: 1;
		}
<<<<<<< HEAD
		&.visited {
			color: #7b7a7a;
			.icon-dot { 
				background: #7b7a7a;
			}
		}
=======
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
	}
	.ada-section {
		width: 100%;
		height: 100%;
		margin-bottom: 40upx;
<<<<<<< HEAD
=======
		image {
			width: 100%;
			height: 100%;
		}
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
	}
	.bottom-section {
		display: flex;
		flex-wrap: wrap;
		.section-item {
			width: 48%;
			margin-bottom: 20upx;
			&:nth-child(2n+1) {
				margin-right: 4%;
			}
<<<<<<< HEAD
		}
	}
}
.mask-bg {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.6);
}
.mask-content {
	position: fixed;
	left: 50%;
	top: 46%;
	z-index: 2;
	margin: -420upx 0 0 -300upx;
	width: 600upx;
	height: 837upx;
	.popup-close {
		position: absolute;
		top: 48upx;
		right: 0;
		width: 48upx;
		height: 48upx;
	}
	.main-text {
		position: absolute;
		top: 374upx;
		left: 50upx;
		right: 50upx;
		color: #ffebd0;
		line-height: 53upx;
		font-size: 14px;
		text-shadow: 2px 3px 3px rgba(255, 42, 19, 0.5);
		.title {
			font: bold 24px/108upx '宋体', Arial;
			text-align: center;
		}
		.desc {
			text-indent: 2em;
		}
	}
}
.mask-content1 {
	position: fixed;
	left: 50%;
	top: 46%;
	z-index: 2;
	margin: -420upx 0 0 -250upx;
	width: 500upx;
	height: 725upx;
	.popup-close {
		position: absolute;
		bottom: -100upx;
		left: 50%;
		width: 64upx;
		height: 64upx;
		margin-left: -32upx;
	}
	.main-text {
		position: absolute;
		top: 280upx;
		left: 50upx;
		right: 50upx;
		bottom: 0;
		color: #fff;
		font-size: 12px;
		text-align: center;
		.title {
			font: bold 20px/70upx '宋体', Arial;
		}
		.sign-time {
			font-size: 12px;
			line-height: 40upx;
		}
		.start-time {
			position: absolute;
			left: 0;
			bottom: 92upx;
			width: 100%;
			color: #323232;
=======
			image {
				width: 100%;
				height: 100%;
			}
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
		}
	}
}
</style>
