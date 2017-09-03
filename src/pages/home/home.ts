import { Component } from '@angular/core';
import { 
	NavController,
	Loading,
	LoadingController,
	ModalController,
	MenuController
} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

import { CategoryPage } from '../category/category';
import { LocationPage } from '../location/location';
import { FilterPage } from '../filter/filter';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public loading:Loading;
	host: string;

	categoryPath: Array<{any}> = [];

	productIsMoreAvailable: boolean = false;
	productPage: number = 1;
	productList = [];

	searchInput: string = '';

	constructor(
		public navCtrl: NavController,
		private loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public menuCtrl: MenuController,
		private api: ApiService,
		private keyboard: Keyboard,
		private global: GlobalService
	) {
		this.host = this.global.getHost();

		this.init();
		this.global.categoryChange.subscribe((data) => {
			this.init();
		});
	}

	init() {
		let loader = this.loadingCtrl.create();
		loader.present();

		this.processProduct(true, ()=> {
			loader.dismiss();
		}, ()=> {
			loader.dismiss();
		});
	}

	processProduct(onInit, fn, fnErr) {
		if (onInit) {
			this.productPage = 1;
			this.productList = [];
		}

		let category = this.global.getCategory();
		let filter: any = {};
		if (category) {
			filter.category = category.item.id;
			this.categoryPath = category.path;
		} else {
			this.categoryPath = [];
		}

		this.api.fetchProducts(this.productPage, filter, (response) => {
			let list = response.response.data;
			this.productIsMoreAvailable = response.info.currentPage < response.info.pageCount;
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

/*
	closeSearchBar(): void {
		this.keyboard.close();
		this.isSearching = false;
	}

	processSearch(onInit, fn, fnErr) {
		if (onInit) {
			this.searchOffset = 0;
			this.searchLimit = 10;
			this.searchList = [];
		}
		else {
			this.searchLimit = 6;
		}

		this.api.searchForHistory(this.searchInput, this.searchOffset, this.searchLimit, (res) => {
			let list = res.list;
			this.isSearchMoreAvailable = res.more_available;
			this.searchOffset = this.searchOffset + this.searchLimit;
			this.searchList = this.searchList.concat(list);
			fn();
		}, (err) => {
			fnErr();
		});
	}

	doSearchInfinite(infiniteScroll:any) {
		if (this.isSearchMoreAvailable) {
			this.processSearch(false, ()=> {
				infiniteScroll.complete();
			}, ()=> {
				infiniteScroll.complete();
			});
		}
		else {
			infiniteScroll.complete();
			// infiniteScroll.enable(false);
		}
	}
*/

	search(event) {
		if (this.searchInput.length > 0) {
			this.loading = this.loadingCtrl.create();
			this.loading.present();

			//this.processSearch(true, ()=> {
				this.loading.dismiss();
			//}, ()=> {
				this.loading.dismiss();
			//});
		}
	}

	clearSearch(event) {
		this.keyboard.close();
	}

	openCategories(event) {
		// let selectCategoryModal = this.modalCtrl.create(LocationPage);
		let selectCategoryModal = this.modalCtrl.create(CategoryPage);
		selectCategoryModal.onDidDismiss(data => {
			if (data.submitted) {
				this.global.toggleCategory();
			}
		});
		selectCategoryModal.present();
//		this.menuCtrl.toggle();
	}

	openFilter() {
		let filterModal = this.modalCtrl.create(FilterPage);
		filterModal.onDidDismiss(data => {
			if (data.submitted) {
				// this.global.toggleCategory();
			}
		});
		filterModal.present();
	}
}
