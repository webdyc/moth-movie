import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
// import Request from 'luch-request' // 使用npm
import settings from '@/settings.js'

const http = new Request({
	baseURL: '', //设置请求的base url
	timeout: 300000, //超时时长5分钟,
	header: {
		'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
	}
})

// 在请求之前拦截
http.interceptors.request.use((config) => { // 可使用async await 做异步操作

	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data);
	}
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

// 在请求之后拦截
http.interceptors.response.use((response) => {
	/* 对响应成功做点什么 可使用async await 做异步操作*/
	return response.data
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log('错了错了', response)
	uni.showToast({
		title: '请检查网络或切换视频源',
		icon: 'none'
	})
	return Promise.reject(response)
})

export default http
