import { Component, ViewChild } from '@angular/core';
import { 
	NavController,
	Loading,
	LoadingController,
	Content,
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
	@ViewChild(Content) content: Content;
	shrinkingEnabled: boolean = false;
	
	public loading:Loading;
	host: string;

	categoryPath: Array<{any}> = [];

	productIsMoreAvailable: boolean = false;
	productPage: number = 1;
	productList = [];
	productFetchAlreadyInProcess: boolean = false;

	mode: string = 'list'; // 'grid', 'list'
	pagination: any = [];
	
	searchInput: string = '';

	wkwebviewTest: string = '';
	somethings: any = new Array(20);


	constructor(
		public navCtrl: NavController,
		private loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public menuCtrl: MenuController,
		private api: ApiService,
		private keyboard: Keyboard,
		private global: GlobalService
	) {
		if (window.indexedDB) {
			console.log("I'm in WKWebView!");
			this.wkwebviewTest = "I'm in WKWebView!";
		} else {
			console.log("I'm in UIWebView");
			this.wkwebviewTest = "I'm in UIWebView!";
		}

		this.pagination = [];
		this.host = this.global.getHost();

		this.init();

		this.global.filterChange.subscribe((data) => {
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

	paginate(list, name, interval) {
		var i, page, _i, _ref;

		this.pagination[name] = [];

		if (list.length === 0) {
			this.pagination[name].push({begin:0, end:1});
			return;
		}

		// for (i in [0..list.length-1] by interval) {
		for (i = _i = 0, _ref = list.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = _i += interval) {
			page = {}
			page.begin = i;
			page.end = i + interval;

			this.pagination[name].push(page);
		}
	}

	toggleMode() {
		let loader = this.loadingCtrl.create();
		loader.present();
		if (this.mode == 'grid') {
			this.mode = 'list';
		}
		else {
			this.mode = 'grid';
		}
		setTimeout(()=> {
			loader.dismiss();
		}, 400);
	}

	processProduct(onInit, fn, fnErr) {
		if (this.productFetchAlreadyInProcess) {
			fnErr(); // ? fn();
			return;
		}
		this.productFetchAlreadyInProcess = true;
		if (onInit) {
			this.productPage = 1;
			this.productList = [];
		}

		let filter: any = {};
		let f = this.global.getFilter();

		if (f.has('location')) {
			filter.location = f.get('location').id;
		}

		if (f.has('category')) {
			filter.category = f.get('category').item.id;
			this.categoryPath = f.get('category').path;
		} else {
			this.categoryPath = [];
		}

		if (f.has('characteristics')) {
			filter.characteristics = [];
			for (let v of f.get('characteristics')) {
				filter.characteristics.push( {
					id: v.character_id,
					value: v.id
				});
			}
		}

		this.api.fetchProducts(this.productPage, filter, (response) => {
			this.productIsMoreAvailable = response.info.currentPage < response.info.pageCount;

			this.shrinkingEnabled = response.info.pageCount > 1;
			this.productPage++;
			
			let list = response.response.data;
			if (list.length > 0) {
				this.productList = this.productList.concat(list);

				this.content.resize();
			}
			this.paginate(this.productList, 'grid', 2);
			
			this.productFetchAlreadyInProcess = false;
			
			fn();
		}, (err) => {
			this.productFetchAlreadyInProcess = false;

			fnErr();
		});
	}

	doRefreshProduct(refresher) {
		this.processProduct(true, ()=> {
			refresher.complete();
			// this.content.resize();
		}, ()=> {
			refresher.complete();
			//this.content.resize();
		});
	}

	doInfiniteProduct(infiniteScroll:any) {
		if (this.productIsMoreAvailable) {
			this.processProduct(false, ()=> {
				infiniteScroll.complete();
				// this.content.resize();
			}, ()=> {
				infiniteScroll.complete();
				//this.content.resize();
			});
		}
		else {
			infiniteScroll.complete();
			// this.content.resize();
		}
	}

	doInfiniteProductPromise(infiniteScroll:any): Promise<any> {
		console.log('Begin async operation');

		return new Promise((resolve) => {
			if (this.productIsMoreAvailable) {
				this.processProduct(false, ()=> {
					infiniteScroll.complete();
					// this.content.resize();
					console.log('Async operation has ended');
					resolve();
				}, ()=> {
					infiniteScroll.complete();
					// this.content.resize();
					console.log('Async operation has ended');
					resolve();
				});
			}
			else {
				infiniteScroll.complete();
				// this.content.resize();
				resolve();
			}
		});
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
		let selectCategoryModal = this.modalCtrl.create(CategoryPage, {
			isModal: true
		});
		selectCategoryModal.onDidDismiss(data => {
			if (data.submitted) {
				this.global.setFilterCategory();
				this.global.toggleFilter();
			}
		});
		selectCategoryModal.present();
//		this.menuCtrl.toggle();
	}

	openFilter() {
		let filterModal = this.modalCtrl.create(FilterPage);
		filterModal.onDidDismiss(data => {
			if (data.submitted) {
				this.global.toggleFilter();
			}
		});
		filterModal.present();
	}

	openProduct(item) {

	}
}
