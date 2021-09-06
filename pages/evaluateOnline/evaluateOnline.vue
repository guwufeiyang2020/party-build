<template>
	<view>
		<view class="evaluate-box">
			<view class="active-info">
				<view class="name">{{activeInfo.activityName}}</view>
				<view class="time">{{activeInfo.startTime}} 至 {{activeInfo.endTime}} 截止</view>
			</view>
			<view class="evaluate-list">
				<view 
					class="evaluate-item" 
					:class="evaluationResult === item.evaluationResult ? 'active' : ''"
					@tap="select(item)"
					v-for="(item, index) in evaluateList" 
					:key="index">
					<view class="item-left">
						<i class="iconfont" :class="computedIconClass(item.type)"></i>
						{{item.type}}
					</view>
					<view class="item-right">
						<view class="item-right-inner"></view>
					</view>
				</view>
			</view>
		</view>
		<button class="btn-submit" @tap="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluationResult: '',
				evaluateList: [{
					type: "优秀",
					evaluationResult: '1'
				}, {
					type: "良好",
					evaluationResult: '2'
				}, {
					type: "一般",
					evaluationResult: '3'
				}, {
					type: "较差",
					evaluationResult: '4'
				}, {
					type: "无时效",
					evaluationResult: '5'
				}],
				id: 0,
				activeInfo: {}
			}
		},
		computed: {
		    computedIconClass() {
				return (type) => {
					if (type === '优秀') {
						return ' icon-youxiu red';
					} else if (type === '良好') {
						return ' icon-lianghao green';
					} else if (type === '一般') {
						return ' icon-yiban yellow';
					} else if (type === '较差') {
						return ' icon-jiaocha orange';
					} else if (type === '无实效') {
						return ' icon-wushixiao gray';
					}	
				};
		    }
		},
		onLoad(option) {
			this.id = option.id;
			this.queryInfo();
		},
		methods: {
			async queryInfo() {
				const { data } = await this.$http({
					url: '/party/evaluation/findEvaluationById',
					data: {
						id: this.id
					}
				});
				if (data.data) {
					this.activeInfo = data.data;
				}
			},
			select(item) {
				this.evaluationResult = item.evaluationResult;
			},
			async submit() {
				if(this.evaluationResult === '') {
					uni.showToast({
						icon: 'none',
						title: '请测评后提交'
					});
					return;
				}
				const { data } = await this.$http({
					url: '/party/evaluation/saveEvaluation',
					data: {
						id: this.id,
						evaluationResult: this.evaluationResult
					}
				});
				if (data.code === 200) {
					uni.showToast({
						title: data.msg
					});
					uni.redirectTo({
						url: '/pages/evaluate/evaluate'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.red{
	color: #f0443c;
}
.green {
	color: #5cbb49;
}
.yellow {
	color: #ffad26;
}
.orange {
	color: #ff9000;
}
.gray {
	color: #a6a8ad;
}
.evaluate-box {
	width: 690upx;
	height: 890upx;
	background-color: #f5f6f9;
	margin: 37upx auto;
	padding: 20upx;
	border-radius: 20upx;
}
.active-info {
	height: 152upx;
	border-bottom: 1px dashed #e7eaf0;
	.name {
		line-height: 72upx;
		font-size: 18px;
		font-weight: bold;
		color: #191919;
	}
	.time {
		line-height: 40upx;
		font-size: 13px;
		color: #aab2bf;
	}
}
.evaluate-list {
	padding: 47upx 0 40upx 0;
	.evaluate-item {
		background-color: #fff;
		height: 100upx;
		margin-bottom: 28upx;
		padding: 0 30upx;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item-left {
			i {
				font-size: 18px;
				margin-right: 24upx;
			}
		}
		.item-right {
			width: 16px;
			height: 16px;
			border-radius: 8px;
			border: 2px solid #ffad26;
			display: flex;
			align-items: center;
			justify-content: center;
			.item-right-inner {
				width: 8px;
				height: 8px;
				border-radius: 4px;
				background-color: #fff;
			}
		}
		&.active {
			.item-right { 
				.item-right-inner { 
					background-color: #ffad26;
				}
			}
		}
	}
	
}
.btn-submit {
	width: 690upx;
	margin: 30upx auto;
	background-color: #f0443c;
	color: #fff;
	line-height: 50px;
	margin-top: 40px;
	border-radius: 25px;
}
</style>
