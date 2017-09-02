import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/Rx';

import { GlobalService } from './global.service';
import { MockService } from './mock.service';

@Injectable()
export class ApiService {
	http: any;
	baseUrl: string;
	mockBaseUrl: string;

	constructor(http: Http, private global: GlobalService, private mock: MockService) {
		this.http = http;
		this.baseUrl = this.global.getHost() + '/api';
		this.mockBaseUrl = this.global.getMockHost() + '/rest';
	}

	fetchAllCategory(fn, fnErr) {
		let url = this.baseUrl + '/category';
		// url = this.mockBaseUrl + '/checkconnection'; // TODO: mock: remove it
		let headers = new Headers();
		let requestOptions = new RequestOptions();
		requestOptions.headers = headers;

		//this.http.get(url, requestOptions).map(res => this.mock.fetchPostsOffset(offset, limit)).subscribe(data => {
		this.http.get(url, requestOptions)
		.timeout(5000)
		.map(res => res.json()).subscribe(data => {
			console.log(data);
			fn(data);
		}, (err)=> {
			fnErr(err);
		});
	}

/*
	id: 8,
	name: "Митсубиси Аиртрек 2003",
	slug: "mitsubisi-airtrek-2003",
	cost: null,
	min_cost: "340000.00",
	max_cost: "400000.00",
	description: "Машина в отличном состояние. ",
	photo: "/file/image?idExt=26.jpg&baseFolder=file_product&format=original",
	is_auction: 1
*/
	fetchProducts(page, fn, fnErr) {
		let url = this.baseUrl + '/product';
		let headers = new Headers();
		let requestOptions = new RequestOptions();
		requestOptions.headers = headers;

		let params: URLSearchParams = new URLSearchParams();
		params.set('page', page);
		requestOptions.search = params;

		this.http.get(url, requestOptions)
		.timeout(5000)
		.map( response => {
			return {
				response: response.json(),
				info: {	
					currentPage: Number(response.headers.get('X-Pagination-Current-Page')),
					pageCount: Number(response.headers.get('X-Pagination-Page-Count')),
					perPage: Number(response.headers.get('X-Pagination-Per-Page')),
					totalCount: Number(response.headers.get('X-Pagination-Total-Count'))
				}
			}
		}).subscribe(data => {
			fn(data);
		}, (err)=> {
			fnErr(err);
		});
	}
}
