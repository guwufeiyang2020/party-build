<template>
	<view>
		<view class="tab-list-box">
			<view class="tab-list">
				<view 
					:class="['tab-item', reqFlag === item.type ? 'active': '']"
					v-for="(item, index) in tabList" 
					:key="item.type" 
					@tap="changeTab(item)">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="tab-content-box">
			<view class="tab-content-list" v-if="activityList && activityList.length > 0">
				<view class="tab-content-item" v-for="item in activityList" :key="item.id">
					<view class="content-left">
						<view class="name">{{item.title}}</view>
						<view class="time">{{item.activityTime}}</view>
						<view class="address">{{item.place}}</view>
					</view>
					<view class="content-right">
						<template v-if="item.checkInStatus === '请假'">
							<button :class="['btn-scan', item.scanFlag === '0'? 'btn-disabled' : '']" @tap="scanCode(item)">
								<i class="iconfont icon-iconfontscan"></i>
								扫码签到
							</button>
							<button :class="['btn-leave', item.scanFlag === '0'? 'btn-disabled' : '']" @tap="toLeave(item)">请假</button>
						</template>
						<template v-if="item.checkInStatus === '请假中'">
							<view class="leave-img">
								<image src="../../static/images/leaving.png" mode="widthFix" />
							</view> 
						</template>
						<template v-if="item.checkInStatus === '按时签到'">
							<button class="btn-on-time">
								<i class="iconfont icon-duihao"></i>
								按时签到
							</button>
							<view class="date-on-time">{{item.checkInTime}}</view>
						</template>
						<template v-if="item.checkInStatus === '延迟签到'">
							<button class="btn-delay">
								<i class="iconfont icon-duihao"></i>
								延时签到
							</button>
							<view class="date-delay">{{item.checkInTime}}</view>
						</template>
						<template v-if="item.checkInStatus === '已请假'">
							<view class="leaved-img">
								<image src="../../static/images/leaved.png" mode="widthFix" />
							</view> 
						</template>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
			<view class="is-end" v-if="isEnd">我是有底线的</view>
		</view>
		<!-- 扫码结果弹窗 -->
		<view class="mask-wrapper" v-if="showPopup">
			<view class="mask-bg"></view>
			<view class="mask-content">
				<image :src="computedImg" mode="widthFix"></image>
				<view class="popup-close" @tap="closePopup">
					<image src="../../static/images/popup-close1.png" mode="widthFix"></image>
				</view>
				<view class="main-text">
					<view class="title">{{computedTitle}}</view>
					<view class="sign-time" v-if=" signType === '1' || signType==='3' || signType==='4' ">签到时间：{{signTime}}</view>
					<view class="sign-time" v-if=" signType === '2' ">会议开始前30分钟内开始签到</view>
					<view class="sign-time" v-if=" signType === '3' ">当前会议开始超过10分钟</view>
					<view class="sign-time" v-if=" signType === '4' ">当前会议开始超过30分钟</view>
					<view class="start-time">{{startTime}}</view>
				</view>
			</view>
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
					title: '待参加',
					type: 1
				}, {
					title: '已签到',
					type: 2
				}, {
					title: '已请假',
					type: 3
				}],
				activityList: [],
				pageNum: 1,
				reqFlag: 1, // 1：待参加，2：已签到，3：已请假
				isEnd: false,
				total: 0,
				contentText: '我是有底线的',
				showPopup: false,
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
			// this.queryActivityList();
		},
		onShow() {
			this.isEnd = false;
			this.activityList = [];
			this.pageNum = 1;
			this.queryActivityList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh(); // 停止当前页面下拉刷新
				this.isEnd = false;
				this.activityList = [];
				this.pageNum = 1;
				this.queryActivityList();
			}, 1000);
		},
		// 上拉加载下一页
		onReachBottom() {
			if(this.pageNum * 5 >= this.total) {
				this.isEnd = true;
				return;
			}
			this.pageNum++;
			this.queryActivityList();
		},
		methods: {
			async queryActivityList() {
				const { data } = await this.$http({
					url: '/checkin/activityList',
					data: {
						pageNum: this.pageNum,
						pageSize: 5,
						reqFlag: this.reqFlag
					}
				});
				this.total = data.data.total;
				this.activityList = this.activityList.concat(data.data.rows);
			},
			changeTab(item) {
				this.isEnd = false;
				this.pageNum = 1;
				this.activityList = [];
				this.reqFlag = item.type;
				this.queryActivityList();
			},
			scanCode(item) {
				if(item.scanFlag === '0') {
					return;
				};
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
							this.showPopup = true;
						})
					}
				}); 
			},
			closePopup() {
				this.isEnd = false;
				this.activityList = [];
				this.pageNum = 1;
				this.queryActivityList();
				this.showPopup = false;
			},
			toLeave(item) {
				if(item.scanFlag === '0') {
					return;
				};
				uni.navigateTo({
				    url: '/pages/leave/leave?id='+ item.id
				});
			}
		}
	}
</script>

<style lang="scss">
.tab-content-item {
	width: 100%;
	border-bottom: 1px solid #e7eaf0;
	padding: 46upx 0 46upx 0;
	display: flex;
	justify-content: space-between;
	.content-left {
		margin-right: 40upx;
	}
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
	padding-top: 10upx;
}
.content-right .btn-scan,
.content-right .btn-leave,
.content-right .btn-on-time,
.content-right .btn-delay {
	width: 202upx;
	height: 64upx;
	line-height: 60upx;
	text-align: center;
	font-size: 12px;
	border-radius: 32upx;
	background-color: #f0443c;
	border: 1px solid #f0443c;
	color: #fff;
}


.content-right .btn-on-time {
	background-color: #4bc7ab;
	border: 1px solid #4bc7ab;
}
.content-right .btn-delay {
	background-color: #f5a88a;
	border: 1px solid #f5a88a;
}
.content-right .btn-scan,
.content-right .btn-on-time {
	display: flex;
	align-items: center;
	box-shadow: 0px 3px 3px 1px rgba(248, 68, 60, 0.1);
	i {
		font-size: 28upx;
		margin-right: 6upx;
	}
}
.content-right .btn-on-time,
.content-right .btn-delay{
	i {
		font-size: 12px;
		margin-right: 4upx;
	}
}
.content-right .date-on-time {
	font-size: 12px;
	color: #4bc7ab;
	line-height: 60upx;
}
.content-right .date-delay {
	font-size: 12px;
	color: #f5a88a;
	line-height: 60upx;
}
.content-right .btn-leave {
	margin-top: 22upx;
	background-color: #fff;
	border: 1px solid #c1c3c8;
	color: #313742;
}
.content-right .leave-img {
	width: 202upx;
	height: 60upx;
} 
.content-right .leaved-img {
	width: 140upx;
	height: 60upx;
}

.content-right .btn-disabled {
	background-color: #cecfd6;
	border: 1px solid #cecfd6;
	color: #fff;
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
		}
	}
}
</style>
