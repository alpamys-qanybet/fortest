export class MapTool {
	static convertMapToObj(aMap) {
		let obj = {};
		if (!aMap) {
			return obj;
		}
		aMap.forEach ((v,k) => { obj[k] = v });
		return obj;
	}

	static convertObjToMap(obj) {
		if (!obj) {
			obj = {};
		}

		let mp = new Map;
		Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
		return mp;
	}
}
