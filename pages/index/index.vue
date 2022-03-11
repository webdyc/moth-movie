<template>
	<view class="app-content">
		<view class="index-box">
			<view class="header">
				<u-tabs :list="movieClass" @click="changeClass" lineColor="#ffffff"
					:inactiveStyle="{ color: '#ffffff' }" :activeStyle="{ color: '#ffffff'}">
					<view slot="right" style="padding: 0 10px;" @tap="siteShowState=true">
						<u-icon name="list" size="21" bold color='#ffffff'></u-icon>
					</view>
				</u-tabs>
				<view class="search">
					<u-search placeholder="搜索视频" :showAction="false" bgColor="#ffffff" :disabled="true" @click="handleSearch(true)"></u-search>
				</view>
			</view>
			<!-- 歌曲列表 -->
			<scroll-view :scroll-y="true" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" :style="`height:${windowHeight - statusBarHeight - 98}px`">
				<Movies :movieList="movieList" :loadmoreStatus='loadmoreStatus'></Movies>
			</scroll-view>
			<!-- 视频源弹出层 -->
			<u-picker :show="siteShowState" :columns="[siteList]" keyName="name" :defaultIndex='[siteKey.id-1]'
				@confirm="handleSite" @cancel="handleSiteClose"></u-picker>
			<!-- 搜索弹出层 -->
			<u-popup :show="isInfoShow">
				<Search @handleSearch="handleSearch"></Search>
			</u-popup>
			
		</view>
	</view>
	
</template>

<script>
	import Search from '@/components/Search/index.vue'
	import Movies from '@/components/movieList/index.vue'
	import {
		mapState
	} from 'vuex'
	import api from '@/api/index';
	import utils from '@/utils/index.js'
	export default {
		data() {
			return {
				// 列表条件
				queryKey: {
					// 类型
					t: 0,
					// 页码
					pg: 1,

				},
				// 搜索弹出层
				isInfoShow:false,
				loadmoreStatus: 'loadmore',
				// 频道分类
				movieClass: [{
					name: '最新',
					tid: 0
				}],
				// 视频源下拉框选择状态
				siteShowState: false,
				// 视频列表
				movieList: []
			}
		},
		onLoad() {

		},
		components: {
			Movies,Search
		},
		computed: {
			...mapState({
				siteKey: (state) => state.webSite.siteKey,
				siteList: (state) => state.webSite.siteList,
				windowHeight: (state) => state.app.systemInfo.windowHeight,
				statusBarHeight: (state) => state.app.systemInfo.statusBarHeight,
			})
		},
		mounted() {
			this.getMovieClass()
			this.getList()
		},
		methods: {
			// 切换视频源
			async handleSite(e) {
				let result = this.$store.dispatch('webSite/changeSiteKeyAsync', e.value[0])
				if(result){
					this.queryKey.pg = 1
					this.getList()
					this.handleSiteClose()
				}
				
			},
			// 回调参数为包含columnIndex、value、values
			handleSiteClose(e) {
				this.siteShowState = false
			},
			// 获取电影分类
			async getMovieClass() {
				// 屏蔽主分类
				const classHide = [
					'电影',
					'电影片',
					'电视剧',
					'连续剧',
					'综艺',
					'动漫'
				]
				let result = await api.movie_class()
				result = result.filter((item) => !classHide.includes(item.name))
				this.movieClass = this.movieClass.concat(result)
			},
			// 切换电影分类
			changeClass(item) {
				this.movieList = []
				this.queryKey.t = item.tid
				this.queryKey.pg = 1
				this.getList()
			},
			// 获取列表
			async getList() {
				let {
					list,
					page,
					pagecount
				} = await api.movie_list(this.queryKey)
				if (page === 1) {
					this.movieList = list
				} else {
					this.movieList = this.movieList.concat(list)
				}
				this.loadmoreStatus = 'loadmore'

				if (page >= pagecount) {
					this.loadmoreStatus = 'nomore'
				}
			},
			// 上拉加载
			scrolltolower() {
				if (this.loadmoreStatus === "loadmore") {
					this.loadmoreStatus = 'loading'
					this.queryKey.pg++
					this.getList()
				}
			},
			// 下拉刷新
			scrolltoupper(e){
				console.log('下拉刷新咯')
			},
			// 搜索页显示状态
			handleSearch(state){
				this.isInfoShow = state
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-content{
		background: rgb(39, 166, 254);
		max-height: 100vh;
	}
	.index-box{
		background: #F8F8F8;
	}
	.header {
		background: rgb(39, 166, 254);
		padding-bottom: 10px;
		.search{
			padding: 0 10px;
			margin-top: 10px;
		}
	}
	.show{
	  animation:show .5s forwards;
	}
	
	.hide{
	  visibility:visible;
	  opacity: 1;
	  transform: translateY(0);
	  animation:hide .5s forwards;
	}
	@keyframes show{
	  to {
	    visibility:visible;
	    opacity: 1;
	    transform: translateY(0);
	  }
	}
	@keyframes hide{
	  to {
	    visibility:hidden;
	    opacity: 0;
	    transform: translateY(-100px);
	  }
	}
</style>
