<template>
	<view class="movie-detail" v-if="playList">
		<u-navbar :title="movieDetail.name" @rightClick="rightClick" :autoBack="true" :placeholder="true"
			:safeAreaInsetTop="true">
		</u-navbar>
		<video :src="playList.list[activeIndex-1]" controls class="video"></video>
		<view class="movie-detail-content">
			<view class="info">
				<view class="title">
					{{movieDetail.name}} {{movieDetail.lang}}
				</view>
				<view class="sub-title">
					<text>{{movieDetail.year}}年</text>
					/
					<text>{{movieDetail.area}}</text>
					/
					<text>{{movieDetail.type}}</text>
				</view>
			</view>

			<view class="episode">
				<view class="header">
					<view class="title">
						选集
						<text class="update">{{movieDetail.note}}</text>
					</view>
					<view class="update" @click="siteShowState=true">
						播放源：{{playList.flag}}
					</view>
				</view>
				<scroll-view scroll-x="true">
					<view class="episode-list">
						<view v-for="(item,index) in playList.list" :key="index"
							:class="[activeIndex==index+1?'active':'','episode-list-item']" @click="handleEpisode(index+1)">
							{{index+1}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 播放源弹出层 -->
		<u-picker :show="siteShowState" :columns="[movieDetail.playList]" keyName="flag" :defaultIndex='[sourceFlag-1]'
			@confirm="handleSite" @cancel="handleSiteClose"></u-picker>
	</view>
</template>

<script>
	import api from '@/api/index';
	export default {
		data() {
			return {
				// 视频源
				siteShowState: false,
				sourceFlag: 1,
				playList: null,
				// 当前播放页数
				activeIndex: 1,
				// 视频详情
				movieDetail: null,

			}
		},
		onLoad(option) {
			this.getDetail(option.id)
		},
		methods: {
			// 切换视频
			handleEpisode(index){
				this.activeIndex = index
				console.log(index)
			},
			rightClick() {
				// 在C页面内 navigateBack，将返回A页面
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取视频详情
			async getDetail(ids) {
				let result = await api.movie_detail({
					ids
				})
				this.movieDetail = result
				
				this.handlePlayList(1)
				console.log(this.movieDetail)
				console.log(this.playList)
			},
			// 切换播放列表
			async handlePlayList(index) {
				this.sourceFlag = index
				this.playList = this.movieDetail.playList.find(item => item.index == index)
			},
			// 切换视频源
			async handleSite(e) {
				this.handlePlayList(e.value[0].index)
				this.handleSiteClose()
			},
			// 回调参数为包含columnIndex、value、values
			handleSiteClose(e) {
				this.siteShowState = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.movie-detail {
		.video {
			width: 100%;
		}

		.movie-detail-content {
			padding: 20rpx;

			.info {
				.title {
					font-size: 32rpx;
					font-weight: bold;
				}

				.sub-title {
					font-size: 24rpx;
					color: rgba(0, 0, 0, .4);
				}
			}

			.episode {
				margin-top: 30rpx;

				.header {
					display: flex;
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						font-weight: bold;

					}

					.update {
						margin-left: 15rpx;
						font-weight: normal;
						font-size: 22rpx;
						color: rgba(0, 0, 0, .4);
					}

				}

				.episode-list {
					margin-top: 20rpx;
					display: flex;

					.episode-list-item {
						font-size: 26rpx;
						flex-shrink: 0;
						width: 80rpx;
						height: 80rpx;
						line-height: 80rpx;
						background: rgba(0, 0, 0, .1);
						text-align: center;
						margin-right: 15rpx;
						border-radius: 5rpx;
					}

					.active {
						background: rgba(39, 166, 254, .8);
						color: #ffffff;
					}
				}
			}
		}
	}
</style>
