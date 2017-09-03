/*
const convertMapToObj = ( aMap => {
	let obj = {};
	aMap.forEach ((v,k) => { obj[k] = v });
	return obj;
});

const convertObjToMap = ( obj => {
	if (!obj) {
		obj = {};
	}

	let mp = new Map;
	Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
	return mp;
});
*/

import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MapTool } from '../tools/map.tool';

@Injectable()
export class GlobalService {
	private mockHost: string = 'http://essc.kz';
	private host: string = 'https://auction.ofmoto.ru';
	private defaultLocation = 1;

	private categoryObserver = new Subject<any>();
	categoryChange = this.categoryObserver.asObservable();

	private characteristicsObserver = new Subject<any>();
	characteristicsChange = this.characteristicsObserver.asObservable();

	private filterObserver = new Subject<any>();
	filterChange = this.filterObserver.asObservable();
	
	constructor() {
	}

	getHost() {
		return this.host;
	}

	getMockHost() {
		return this.mockHost;
	}

	setLocation(data:any) {
		let json: string = JSON.stringify(data);
		localStorage.setItem('location', json);
	}

	getCurrentLocation() {
		return this.getLocation() || this.getDefaultLocation();
	}

	getLocation() {
		return JSON.parse(localStorage.getItem('location'));
	}

	getDefaultLocation() {
		return this.defaultLocation;
	}

	setCategory(data:any) {
		let json: string = JSON.stringify(data);
		localStorage.setItem('category', json);
		this.categoryObserver.next();
	}

	getCategory() {
		return JSON.parse(localStorage.getItem('category'));
	}

	clearCategory() {
		localStorage.removeItem('category');
		this.categoryObserver.next();
	}

	toggleCategory() {
		this.categoryObserver.next();
	}

	setCharacteristics(data:any) {
		let json: string = JSON.stringify(MapTool.convertMapToObj (data));
		localStorage.setItem('characteristics', json);
		this.characteristicsObserver.next(data);
	}

	getCharacteristics() {
		let obj = JSON.parse(localStorage.getItem('characteristics'));
		return MapTool.convertObjToMap (obj);
	}

	setCharacter(data) {
		let map = this.getCharacteristics()
		map.set('character_id_' + data.character_id, data);
		this.setCharacteristics(map);
	}

	removeCharacter(id) {
		let map = this.getCharacteristics()
		map.delete('character_id_' + id);
		this.setCharacteristics(map);
	}

	clearCharacteristics() {
		localStorage.removeItem('characteristics');
	}
/*
	toggleCharacteristics() {
		this.characteristicsObserver.next();
	}
*/
	
	setFilter(data:any) {
		let json: string = JSON.stringify(MapTool.convertMapToObj (data));
		localStorage.setItem('filter', json);
	}

	getFilter() {
		let obj = JSON.parse(localStorage.getItem('filter'));
		return MapTool.convertObjToMap (obj);
	}

	toggleFilter() {
		this.filterObserver.next();
	}

/*
	setFilterCharacteristics(data) {
		let map = this.getFilter()
		let json: string = JSON.stringify(MapTool.convertMapToObj (data));
		map.set('characteristics', json);
		this.setFilter(map);
	}
*/

	setFilterCharacteristics() {
		let c = localStorage.getItem('characteristics');
		if (c) {
			let map = this.getFilter();
			map.set('characteristics', _.values(JSON.parse(c)) );
			this.setFilter(map);
			this.clearCharacteristics();
		}
	}

	removeFilterCharacteristics() {
		let map = this.getFilter();
		map.delete('characteristics');
		this.setFilter(map);
	}
}