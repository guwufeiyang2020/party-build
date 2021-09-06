<template>
	<view style="width: 100%;" >
		<web-view :src="allUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allUrl:'',
				viewerUrl: '/hybrid/html/web/viewer.html', // 格式化文件流的一个js 文件
			}
		},
		onLoad(options) {
			// encodeURIComponent 函数可把字符串作为 URI 组件进行编码。decodeURIComponent解码
			let fileUrl = encodeURIComponent(decodeURIComponent(options.fileUrl)); 
			this.allUrl = this.viewerUrl + '?file=' + fileUrl
		  }
	}
</script>

