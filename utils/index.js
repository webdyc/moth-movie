export function handleM3u8(result) {
	let dd = result.dl.dd
	const type = Object.prototype.toString.call(dd)
	let playList = []
	if (type === '[object Array]') { //多个源
		playList = dd.map((item,index)=>{
			let data = {
				index: index+1,
				id: result.id,
				flag: item._flag
			}
			data.list = item._t.split('#').map(item=> {
				let reg2 = /([^$]+)$/;
				item.split('$')
				item = item.match(reg2)[1];
				return item
			})
			return data
		})
	} else {
		let data = {
			index: 1,
			id: result.id,
			flag: dd._flag
		}
		data.list = dd._t.split('#').map(item=> {
			let reg2 = /([^$]+)$/;
			item.split('$')
			item = item.match(reg2)[1];
			return item
		})
		playList.push(data)
	}
	return playList
}
