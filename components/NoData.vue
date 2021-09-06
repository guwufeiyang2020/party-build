<template>
	<view class="no-data">
		<view class="img-box">
			<image src="../static/images/no-data.png" mode="widthFix" />
		</view>
		<view>{{text}}</view>
	</view>
</template>


<script>
export default { 
	props: {
		text: {
		  type: String,
		  default: '暂无数据'
		}
	 }
}
</script>

<style lang="scss">
.no-data {
    width: 100%;
    height: 100%;
    padding-top: 120upx;
    text-align: center;
    font-size: 16px;
    color: #363b40;
    line-height: 50upx;
	.img-box {
		width: 411upx;
		height: 283upx;
		margin: 0 auto;
	}
}
</style>
