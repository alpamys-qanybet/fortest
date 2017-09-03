import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class GlobalService {
	private mockHost: string = 'http://essc.kz';
	private host: string = 'https://auction.ofmoto.ru';
	private defaultLocation = 1;

	private categoryObserver = new Subject<any>();
	categoryChange = this.categoryObserver.asObservable();
	
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
}