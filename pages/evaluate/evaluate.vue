<template>
	<view>
		<view class="tab-list-box">
			<view class="tab-list">
				<view 
					:class="['tab-item', isEvaluated === item.type ? 'active' : '']"
					v-for="(item, index) in tabList" 
					:key="index" 
					@tap="changeTab(item)">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 待参加 -->
		<view class="tab-content-box">
			<view class="tab-content-list" v-if="evaluationList && evaluationList.length > 0">
				<view class="tab-content-item" v-for="item in evaluationList" :key="item.id">
					<view class="content-left">
						<view class="name">{{item.activityName}}</view>
						<view class="time">{{item.startTime}} 至 {{item.endTime}} 截止</view>
					</view>
					<view class="content-right">
						<template v-if="item.isEvaluated === 'N'">
							<view class="btn-share" @tap="toEvaluate(item)">
								<i class="iconfont icon-ceping"></i>
							</view>
						</template>
						<template v-if="item.isEvaluated === 'Y'">
							<view class="evaluate-img">
								<image src="../../static/images/evaluate.png" mode="widthFix" />
							</view> 
						</template>
					</view>
				</view>
			</view>
			<no-data v-else text="暂无测评"></no-data>
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
					title: '待测评',
					type: 'N'
				}, {
					title: '已测评',
					type: 'Y'
				}],
				evaluationList: [],
				isEvaluated: 'N'
			}
		},
		onLoad() {
			// this.queryEvaluationList();
		},
		onShow() {
			this.queryEvaluationList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh(); // 停止当前页面下拉刷新
				this.evaluationList = [];
				this.queryEvaluationList();
			}, 1000);
		},
		methods: {
			async queryEvaluationList() {
				const { data } = await this.$http({
					url: '/party/evaluation/listEvaluation',
					method: 'POST',
					data: {
						isEvaluated: this.isEvaluated
					}
				});
				this.evaluationList = data.data.rows;
			},
			changeTab(item) {
				this.isEvaluated = item.type;
				this.queryEvaluationList();
			},
			toEvaluate(item) {
				uni.navigateTo({
					url: '/pages/evaluateOnline/evaluateOnline?id='+ item.id
				});
			},
		}
	}
</script>

<style lang="scss">
.tab-content-item {
	width: 100%;
	height: 220upx;
	border-bottom: 1px solid #e7eaf0;
	padding-top: 46upx;
	display: flex;
	justify-content: space-between;
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
	padding-top: 16upx;
}
.content-right .share-box {
	width: 170upx;
	height: 170upx;
	border-radius: 50upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}	
 .btn-share {
	width: 92upx;
	height: 92upx;
	border-radius: 50upx;
	margin-bottom: 10upx;
	background-color: #ffad26;
	box-shadow: 0px 3px 5px 2px rgba(255, 173, 38, 0.2);
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn-share i {
	font-size: 18px;
}

.content-right .evaluate-img {
	width: 141upx;
	height: 61upx;
}
</style>
