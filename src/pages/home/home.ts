import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	productIsMoreAvailable: boolean = false;
	productPage: number = 1;
	productList = [];
	host: string;

	constructor(
		public navCtrl: NavController,
		private loadingCtrl: LoadingController,
    	private api: ApiService,
		private global: GlobalService
	) {
		this.host = this.global.getHost();
		let loader = this.loadingCtrl.create();
		loader.present();

		this.processProduct(true, ()=> {
			loader.dismiss();
		}, ()=> {
			loader.dismiss();
		})
	}

	processProduct(onInit, fn, fnErr) {
		if (onInit) {
			this.productPage = 1;
			this.productList = [];
		}

		this.api.fetchProducts(this.productPage, (data) => {
			console.log(data);
			let list = data.response.data;
			this.productIsMoreAvailable = data.info.currentPage < data.info.pageCount;
			this.productPage++;
			this.productList = this.productList.concat(list);
			fn();
		}, (err) => {
			fnErr();
		});
	}

	doRefreshProduct(refresher) {
		this.processProduct(true, ()=> {
			refresher.complete();
		}, ()=> {
			refresher.complete();
		});
	}

	doInfiniteProduct(infiniteScroll:any) {
		if (this.productIsMoreAvailable) {
			this.processProduct(false, ()=> {
				infiniteScroll.complete();
			}, ()=> {
				infiniteScroll.complete();
			});
		}
		else {
			infiniteScroll.complete();
		}
	}
}
