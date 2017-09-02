import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class GlobalService {
	private mockHost: string = 'http://essc.kz';
	private host: string = 'https://auction.ofmoto.ru';

	constructor() {
	}

	getHost() {
		return this.host;
	}

	getMockHost() {
		return this.mockHost;
	}
}