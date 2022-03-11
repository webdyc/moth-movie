<template>
	<!-- 下拉加载 -->
	<u-loadmore :status="loadmoreStatus" :loadmoreText="loadmoreText" :loadingText="loadingText" :nomoreText="nomoreText"/>
</template>

<script>
	export default {
		props: {
			loadmoreStatus: {
				type: String,
				default: 'loadmore',
			}
		},
		data() {
			return {
				// 加载前的提示语
				loadmoreText: '加载前的提示语',
				// 加载中提示语
				loadingText: '加载中提示语',
				// 没有更多的提示语
				nomoreText: '没有更多的提示语'
			}
		},
		mounted() {
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>
