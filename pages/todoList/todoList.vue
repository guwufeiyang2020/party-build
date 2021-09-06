<template>
	<view>
		<view class="tab-list-box">
			<view class="tab-list">
				<view 
					:class="['tab-item', todoStatus === item.type ? 'active': '']"
					v-for="(item, index) in tabList" 
					:key="index" 
					@tap="changeTab(item)">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 待参加 -->
		<view class="tab-content-box" >
			<view class="tab-content-list" v-if="todoList && todoList.length > 0">
				<view class="tab-content-item" 
				v-for="item in todoList" 
				:key="item.id"
				@tap="toDetail(item)">
					<view class="content-left">
						<view class="name">{{item.title}}</view>
						<view class="time">{{item.createTimeStr}} </view>
					</view>
					<i class="iconfont icon-jiantou2"></i>
				</view>
			</view>
			<no-data v-else text="暂无待办"></no-data>
			<view class="is-end" v-if="isEnd">我是有底线的</view>
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
				todoStatus: 1,
				tabList: [{
					title: '待处理',
					type: 1
				}, {
					title: '已处理',
					type: 2
				}],
				pageNum: 1,
				isEnd: false,
				total: 0,
				contentText: '我是有底线的',
				todoList: []
			}
		},
		onShow() {
			this.isEnd = false;
			this.todoList = [];
			this.pageNum = 1;
			this.queryTodoList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh(); 
				this.isEnd = false;
				this.todoList = [];
				this.pageNum = 1;
				this.queryTodoList();
			}, 1000);
		},
		// 上拉加载下一页
		onReachBottom() {
			if(this.pageNum * 5 >= this.total) {
				this.isEnd = true;
				return;
			}
			this.pageNum++;
			this.queryTodoList();
		},
		methods: {
			async queryTodoList() {
				const { data } = await this.$http({
					url: '/todo/list',
					method: 'POST',
					data: {
						pageNum: this.pageNum,
						pageSize: 5,
						reqFlag: this.todoStatus
					}
				});
				this.total = data.data.total;
				this.todoList = this.todoList.concat(data.data.rows);
			},
			changeTab(item) {
				this.isEnd = false;
				this.pageNum = 1;
				this.todoList = [];
				this.todoStatus = item.type;
				this.queryTodoList();
			},
			toDetail(item) {
				if(item.dataType === 'leave_apply_to_do') {
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail4?url='+ item.url +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				} else if(item.dataType === 'three_to_do'){
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail1?url='+ item.url  +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				} else if (item.dataType === 'obj_to_do') {
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail2?url='+ item.url +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				} else if (item.dataType ==='activity_to_do') {
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail3?url='+ item.url +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				} else if (item.dataType ==='committee_change_to_do') {
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail5?url='+ item.url +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				} else if (item.dataType ==='committee_change_approval_to_do') {
					uni.navigateTo({
						url: '/pages/todoDetail/todoDetail6?url='+ item.url +"&dataId=" + item.dataId +"&todoId=" + item.todoId + "&todoStatus=" + this.todoStatus
					});
				}
			}, 
		}
	}
</script>

<style lang="scss">
.tab-content-box {
	padding: 46upx 40upx 20upx;
} 
.tab-content-item {
	width: 100%;
	background-color: #f5f6f9;
	margin-bottom: 30upx;
	padding: 30upx;
	border-radius: 16upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.icon-jiantou2 {
		margin-left: 30upx;
		font-size: 14px;
		color: #9aa4b3;
	}
}
.content-left .name {
	line-height: 50upx;
	font-size: 14px;
	color: #191919;
}
.content-left .time {
	line-height: 55upx;
	font-size: 13px;
	color: #9aa4b3;
}
</style>

