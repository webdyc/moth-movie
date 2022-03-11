<script>
	import {
		mapState
	} from "vuex";
	import {setLocalStorage,getLocalStorage,clearLocalStorage} from "@/utils/auth.js";
	export default {
		onLaunch: function() {
			// console.log('试听列表',getLocalStorage('HISTORYLIST'))
			// console.log('收藏列表',getLocalStorage('COLLECT'))
			console.log('设备信息',getLocalStorage('SYSTEMINFO'))
			// 获取设备信息
			// if(getLocalStorage('SYSTEMINFO')){
			// 	this.$store.dispatch('app/changeSystemInfoAsync',getLocalStorage('SYSTEMINFO'))
			// }else{
			// 	uni.getSystemInfo({
			// 		success: (data)=>{
			// 			console.log(data)
			// 			this.$store.dispatch('app/changeSystemInfoAsync',data)
			// 		}
			// 	})
			// }
			uni.getSystemInfo({
				success: (data)=>{
					this.$store.dispatch('app/changeSystemInfoAsync',data)
				}
			})
			// this.$store.dispatch('player/changeHistoryListAsync',getLocalStorage('HISTORYLIST'))
			// this.$store.dispatch('collect/changeStoreListAsync',getLocalStorage('COLLECT'))
		},
		onShow: function() {
			console.log('App Show')
			// 隐藏tabbar
			// uni.hideTabBar()
			
		},
		onHide: function() {
			console.log('App Hide')
			// 本地持久化 - 设备信息
			setLocalStorage('SYSTEMINFO',this.$store.getters.systemInfo)
			// 本地持久化 - 试听列表
			// setLocalStorage('HISTORYLIST',this.$store.getters.historyList)
			// 本地持久化 - 收藏列表
			// setLocalStorage('COLLECT',this.$store.getters.storeList)
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/styles/index.scss";
	/*每个页面公共css */
</style>
