const state = {
    // 收藏列表
    storeList: [],
	// 搜索历史记录
	searchHistory: [],
}
const mutations = {
	// 记录
	CHANGE_SETTING: (state, { key, value }) => {
	    // eslint-disable-next-line no-prototype-builtins
	    if (state.hasOwnProperty(key)) {
	      state[key] = state[key].concat(value)
	    }
	},
    // 删除收藏
    REMOVE_SETTING (state, { key, id }) {
        if (state[key] === null) return
        state[key] = state[key].filter((item) => {
            return +item.id !== +id
        })
    },
}

const actions = {
    // 更改收藏列表
    async changeStoreListAsync ({ state,commit },{ key, value }) {
		// 先判断收藏记录是否存在此歌曲
		let isExist = state[key].filter(item=>item.id == value.id)
		if(isExist.length<=0){ //存在记录
			// 储存歌曲信息
			commit('CHANGE_SETTING', { key, value })
		}
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
