// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes=0;
// 封装请求方法，并向外暴露该方法
export const myHttp = (options)=>{
	// 解构请求头参数
	let header = {...options.header};
   
	// 不需要登录的接口
	const noToken = [
		'/captchaImage',
		'/login'
	];
	// 当前请求不是登录时请求，在header中加上后端返回的token
	if( !(noToken.indexOf(options.url) >= 0) ) {
	    header["Authorization"] = uni.getStorageSync('token');
	} 
	ajaxTimes++;
	// 显示加载中 效果
	uni.showLoading({
		title: "加载中",
	    mask: true
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url: getApp().globalData.BASE_URL + options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header,
			success: (res) => {
				if (res.data.code === 200) {
					uni.hideLoading();
					resolve(res)
				} else if(res.data.code === 401) {
					uni.hideLoading();
					uni.reLaunch({
					    url: '/pages/login/login'
					});
				} else {
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title: res.data.msg
					});
				}
			},
			fail: (err) => {
				return uni.showToast({
					title: err
				})
				reject(err)
			},
			// 完成之后关闭加载效果
			complete:() => {
				ajaxTimes--;
				if(ajaxTimes===0) {
			        //  关闭正在等待的图标
			        uni.hideLoading();
			    }
			}
		})
	})
}
