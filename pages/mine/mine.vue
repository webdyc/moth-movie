<template>
	<view class="setting">
		<view class="header" :style="`padding-top: ${statusBarHeight+10}px`">
			<image :src="settings.logo" class="logo" />
			<view class="text">飞蛾视频</view>
		</view>
		<view class="content">
			<view class="content card">
				<view class="card-title">项目协议</view>
				<view class="card-content">
					所有资源来自网上, 该软件不参与任何制作, 上传, 储存等内容,
					禁止传播违法资源. 该软件仅供学习参考, 请于安装后24小时内删除.
				</view>
			</view>
			<view class="card">
				<view class="card-title title-line">设置</view>
				<view class="card-content">
					<view class="card-list-item">
						<view class="left">
							播放记录
						</view>
						<view class="right">
							记录播放历史
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
					<view class="card-list-item">
						<view class="left">
							视频源管理
						</view>
						<view class="right">
							管理视频源数据
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
					<view class="card-list-item">
						<view class="left">
							清空播放记录
						</view>
						<view class="right">
							清空播放记录数据
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
					<view class="card-list-item">
						<view class="left">
							清空收藏夹
						</view>
						<view class="right">
							清空播放记录数据
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
					<view class="card-list-item">
						<view class="left">
							重置软件
						</view>
						<view class="right">
							清空所有数据, 慎点
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
					<view class="card-list-item">
						<view class="left">
							版本更新
						</view>
						<view class="right">
							0.1.2
							<u-icon name="arrow-right" color="rgba(0,0,0,.4)"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import settings from '@/settings.js';
	import {
		clearLocalStorage
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				settings,
				swiperList: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
			}
		},
		onShow() {

		},
		computed: {
			...mapState({
				statusBarHeight: (state) => state.app.systemInfo.statusBarHeight,
			})
		},
		methods: {
			// 清楚缓存
			clearCache() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		position: relative;
		background: #F8F8F8;

		.header {
			display: flex;
			align-items: center;
			background: #ffffff;
			padding: 20rpx;

			.logo {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.text {
				margin-left: 15rpx;
				font-size: 25rpx;
				font-weight: bold;
			}
		}

		.swiper {
			margin-top: 40rpx;
		}

		.content {
			padding: 0 20rpx;
		}

		.card {
			background: #ffffff;
			border-radius: 15rpx;
			margin-top: 20rpx;
			padding: 20rpx;
			box-shadow: 0 2upx 12upx rgba(0, 0, 0, 0.15);

			.card-title {
				font-size: 28rpx;
				font-weight: bold;
			}

			.card-content {
				margin-top: 10rpx;

				.card-list-item {
					display: flex;
					justify-content: space-between;
					line-height: 88rpx;

					.left {
						font-size: 30rpx;
					}

					.right {
						color: rgba(0, 0, 0, .4);
						display: flex;
					}
				}
			}
		}
	}
</style>
