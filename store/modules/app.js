const state = {
	// 设备信息
	systemInfo: null,
	// 当前tabbar下标
	active: 0,
    // tabBar
    tabBarList: [
		{
			index: 0,
			pagePath: "/pages/search/index",
			iconPath: "search",
			selectedIconPath: "search",
			text: '搜索',
		},
		{
			index: 1,
			pagePath: "/pages/playList/index",
			iconPath: "home",
			selectedIconPath: "home",
			text: '歌单',
		},
		{
			index: 2,
			pagePath: "/pages/collect/index",
			iconPath: "heart",
			selectedIconPath: "heart",
			text: '收藏',
		},
		{
			index: 3,
			pagePath: "/pages/setting/index",
			iconPath: "setting",
			selectedIconPath: "setting",
			text: '设置',
		}
	]
}
const mutations = {
	// 设备信息
	SET_SYSTEMINFO (state, payload) {
	    state.active = payload
	},
    // tabBar
    SET_TABBAR (state, payload) {
        state.systemInfo = payload
    }
}

const actions = {
	// 获取设备信息
	async changeSystemInfoAsync ({ commit },data) {
	    commit('SET_TABBAR', data)
	},
    // 获取tabBar列表
    async changetabBarListAsync ({ commit },index) {
        commit('SET_TABBAR', index)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
