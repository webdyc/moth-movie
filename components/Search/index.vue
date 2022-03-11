<template>
	<view class="search">
		<view class="header" :style="`padding-top: ${statusBarHeight+10}px`">
			<u-search v-model="keyword" placeholder="搜索视频" bgColor="#ffffff" name="search" actionText="取消"
				:actionStyle="{ color: '#ffffff'}" @change="handelSearch" @clear="handelClearSearch" @custom='close'></u-search>
		</view>
		<view class="movieList" v-if="keyword">
			<u-list :height="windowHeight - 108">
				<view class="movie-list-item" v-for="item in movieList" :key="item.id" @click="goInfo(item)">
					{{item.name}}
				</view>
			</u-list>
		</view>
		<view class="history" v-else>
			<view class="history-title">
				<text>历史搜索</text>
				<u-icon name="trash"></u-icon>
			</view>
			<view class="history-list">
				<view class="history-list-item" v-for="(item,index) in searchHistory" :key='index' @click="goInfo(item)">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import api from '@/api/index';
	import {setLocalStorage,getLocalStorage,clearLocalStorage} from "@/utils/auth.js";
	export default {
		data() {
			return {
				keyword: '',
				movieList: [],
			}
		},
		computed: {
			...mapState({
				windowHeight: (state) => state.app.systemInfo.windowHeight,
				searchHistory: (state) => state.collect.searchHistory,
				statusBarHeight: (state) => state.app.systemInfo.statusBarHeight,
			})
		},
		methods: {
			// 获取列表
			async handelSearch() {
				let {
					list,
					page,
					pagecount
				} = await api.movie_search(this.keyword)
				this.movieList = list
			},
			// 清空搜索框
			handelClearSearch(){
				this.movieList = []
			},
			// 关闭搜索页
			close(){
				this.$emit('handleSearch',false)
			},
			// 去往详情页
			goInfo(row) {
				if (row) {
					this.$store.dispatch('collect/changeStoreListAsync',{key:'searchHistory',value:row})
					uni.navigateTo({
						url: '/pages/detail/detail?id=' + row.id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		height: 100vh;

		.header {
			background: rgb(39, 166, 254);
			padding: 10px;
		}
		.movieList{
			.movie-list-item{
				border-bottom: 1rpx solid rgba(0, 0, 0, .1);
				line-height: 60rpx;
				padding: 0 20rpx;
			}
		}
		.history {
			padding: 0 40rpx;

			.history-title {
				line-height: 80rpx;
				display: flex;
				justify-content: space-between;
			}

			.history-list {
				display: flex;
				flex-wrap: wrap;
				.history-list-item {
					border: 1rpx solid rgba(0, 0, 0, .4);
					padding: 8rpx 20rpx;
					border-radius: 30rpx;
					margin-right: 15rpx;
					margin-bottom: 15rpx;
				}
			}
		}
	}
</style>
