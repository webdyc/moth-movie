<template>
	<view class="movie">
		<view class="movie-list">
			<view class="movie-list-item" v-for="item in movieList" :key='item.id' @click="goInfo(item)">
				<u-image :src="item.pic" :lazy-load="true" class="movie-pic" width="210rpx" height="250rpx" :radius='5'>
				</u-image>
				<view class="name ellipsis-line">{{item.name}}</view>
			</view>
		</view>
		<!-- 上拉加载 -->
		<Loadmore :loadmoreStatus="loadmoreStatus"></Loadmore>
	</view>
</template>

<script>
	import Loadmore from '@/components/Loadmore/index.vue'
	export default {
		props: {
			loadmoreStatus: {
				type: String,
				default: 'loadmore'
			},
			movieList: {
				type: Array,
				default: () => []
			},
		},
		components: {
			Loadmore
		},
		data() {
			return {}
		},

		onLoad() {

		},
		methods: {
			// 下拉加载
			scrolltolower() {
				this.$emit('scrolltolower')
			},
			// 去往详情页
			goInfo(row) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + row.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.movie {
		padding: 20rpx;

		.movie-list {
			display: flex;
			flex-wrap: wrap;

			.movie-list-item {
				width: 210rpx;
				margin: 0 13rpx 15rpx 13rpx;

				.name {
					text-align: center;
					line-height: 60rpx;
				}
			}

		}
	}
</style>
