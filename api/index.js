import request from "@/api/request";
import store from '@/store/index.js';
import {
	handleM3u8
} from '@/utils/index.js'
import {
	XMLParser
} from 'fast-xml-parser'

const api = {
	// fast-xml-parser配置
	xmlConfig: {
		trimValues: true,
		textNodeName: '_t',
		ignoreAttributes: false,
		attributeNamePrefix: '_',
		parseAttributeValue: true
	},
	// 获取视频源的分类
	async movie_class() {
		let api = await store.dispatch('webSite/getSiteKeyAsync', 'api')
		let res = await request.get(`${api}/stories/latest`)
		const parser = new XMLParser(this.xmlConfig);
		const json = parser.parse(res)
		const arr = []
		if (json.rss.class) {
			for (const i of json.rss.class.ty) {
				const j = {
					tid: i._id,
					name: i._t
				}
				arr.push(j)
			}
		}
		return arr

	},
	// 获取总资源数, 以及页数
	async movie_list(options = {}) {
		options = Object.assign({
				ac: 'videolist',
				t: 0,
				pg: 1,
			},
			options
		);
		let api = await store.dispatch('webSite/getSiteKeyAsync', 'api')
		const res = await request.get(`${api}`, {
			params: options
		})
		const parser = new XMLParser(this.xmlConfig);

		const json = parser.parse(res)
		console.log(json)
		const result = {
			list: json.rss.list.video,
			page: json.rss.list._page,
			pagecount: json.rss.list._pagecount,
			pagesize: json.rss.list._pagesize,
			recordcount: json.rss.list._recordcount
		}
		return result
	},
	// 搜索资源
	async movie_search(wd) {
		let api = await store.dispatch('webSite/getSiteKeyAsync', 'api')
		const res = await request.get(`${api}?wd=${wd}`)
		const parser = new XMLParser(this.xmlConfig);
		const json = parser.parse(res)
		if (json && json.rss && json.rss.list) {
			const result = {
				list: json.rss.list.video,
				page: json.rss.list._page,
				pagecount: json.rss.list._pagecount,
				pagesize: json.rss.list._pagesize,
				recordcount: json.rss.list._recordcount
			}
			return result
		}
		return null
	},
	// 获取资源详情
	async movie_detail(options = {}) {
		options = Object.assign({
				ac: 'videolist',
				ids: ''
			},
			options
		);
		let api = await store.dispatch('webSite/getSiteKeyAsync', 'api')
		const res = await request.get(`${api}`, {
			params: options
		})
		const parser = new XMLParser(this.xmlConfig);
		const json = parser.parse(res)
		if (json && json.rss && json.rss.list) {
			const result = json.rss.list.video
			result.playList = await handleM3u8(result)
			return result
		}
		return null
	}
}
export default api
