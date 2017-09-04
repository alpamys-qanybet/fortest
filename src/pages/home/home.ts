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
	@ViewChild('contentRef') contentHandle: Content;

	private tabBarHeight;
	private headerHeight;
	private contentBox;

	public loading:Loading;
	host: string;

	categoryPath: Array<{any}> = [];

	productIsMoreAvailable: boolean = false;
	productPage: number = 1;
	productList = [];

	mode: string = 'grid'; // 'grid', 'list'
	pagination: any = [];
	
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
		this.pagination = [];
		this.host = this.global.getHost();

		this.init();
		this.global.categoryChange.subscribe((data) => {
			this.global.removeFilterCharacteristics();
			this.init();
		});

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

		let f = this.global.getFilter();
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
			let list = response.response.data;
			this.productIsMoreAvailable = response.info.currentPage < response.info.pageCount;
			this.productPage++;
			this.productList = this.productList.concat(list);

			this.paginate(this.productList, 'grid', 2);
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
				this.global.toggleFilter();
			}
		});
		filterModal.present();
	}

	openProduct(item) {

	}

	ionViewDidEnter() {
		this.contentBox = document.querySelector('.scroll-content')['style'];
		this.headerHeight = this.contentBox.marginTop;
		this.tabBarHeight = this.contentBox.marginBottom;
		//document.querySelector(".scroll-content")['style'].transition = 'margin 0.4s linear';
		//document.querySelector(".scroll-content")['style'].zIndex = '1000';
		
		//document.querySelector(".scroll-content")['style'].transition = 'margin 0.4s linear';
		//document.querySelector(".e-shopper-scroll-header")['style'].transition = 'opacity 0.5s linear';

		document.querySelector(".e-shopper-scroll-header")['style'].transition = 'opacity 0.6s linear, top 1.3s ease';
		document.querySelector(".tabbar")['style'].transition = 'opacity 0.6s linear, bottom 1.3s ease';
		
		document.querySelector(".scroll-content")['style'].transition = 'margin-top 1.8s ease';
		document.querySelector(".scroll-content")['style'].transition = 'margin-bottom 1.8s ease';
	}

/*
	scrollingFun(e) {
		// if (e.scrollTop > this.contentHandle.getContentDimensions().contentHeight) {
		// if (e.scrollTop > (this.contentHandle.getContentDimensions().contentHeight/3)) {
		if (e.directionY == 'down' && e.scrollTop > 60) {
			//document.querySelector('.e-shopper-scroll-header')['style'].opacity = 0;
			//document.querySelector(".e-shopper-scroll-header")['style'].transition = 'opacity 0.4s linear';
			document.querySelector(".e-shopper-scroll-header")['style'].top = '-'+this.headerHeight;
			document.querySelector(".e-shopper-scroll-header")['style'].transition = 'top 0.4s ease';

			//document.querySelector(".tabbar")['style'].opacity = 0;
			//document.querySelector(".tabbar")['style'].transition = 'opacity 0.4s linear';
			document.querySelector(".tabbar")['style'].bottom = '-'+this.tabBarHeight; //'-40px';
			document.querySelector(".tabbar")['style'].transition = 'bottom 0.4s linear';

			this.contentBox.marginTop = 0;
			this.contentBox.marginBottom = 0;
			document.querySelector(".scroll-content")['style'].marginTop = 0;
			document.querySelector(".scroll-content")['style'].marginBottom = 0;
			//document.querySelector(".scroll-content")['style'].transition = 'margin 0.4s linear';
		} 
		if (e.directionY == 'up' && e.scrollTop < 10) {
			//document.querySelector('.e-shopper-scroll-header')['style'].opacity = 1;
			//document.querySelector(".e-shopper-scroll-header")['style'].transition = 'opacity 0.4s linear';
			document.querySelector(".e-shopper-scroll-header")['style'].top = 0;
			document.querySelector(".e-shopper-scroll-header")['style'].transition = 'top 0.4s linear';
			
			//document.querySelector(".tabbar")['style'].opacity = 1;
			//document.querySelector(".tabbar")['style'].transition = 'opacity 0.4s linear';
			document.querySelector(".tabbar")['style'].bottom = 0;
			document.querySelector(".tabbar")['style'].transition = 'bottom 0.4s linear';

			this.contentBox.marginTop = this.headerHeight;
			this.contentBox.marginBottom = this.tabBarHeight;
			document.querySelector(".scroll-content")['style'].marginTop = this.headerHeight;
			document.querySelector(".scroll-content")['style'].marginBottom = this.tabBarHeight;
			//document.querySelector(".scroll-content")['style'].transition = 'margin 0.4s linear';	
		}
	}
*/
	
	scrollingFun(e) {
		if (e.scrollTop > 60) {
			document.querySelector('.e-shopper-scroll-header')['style'].opacity = 0.4;
			document.querySelector(".e-shopper-scroll-header")['style'].top = '-'+this.headerHeight;
	
			document.querySelector(".tabbar")['style'].opacity = 0.4;
			document.querySelector(".tabbar")['style'].bottom = '-'+this.tabBarHeight;
			
			document.querySelector(".scroll-content")['style'].marginTop = 0;
			document.querySelector(".scroll-content")['style'].marginBottom = 0;
		} else {
			document.querySelector('.e-shopper-scroll-header')['style'].opacity = 1;
			document.querySelector(".e-shopper-scroll-header")['style'].top = 0;
			
			document.querySelector(".tabbar")['style'].opacity = 1;
			document.querySelector(".tabbar")['style'].bottom = 0;
			
			document.querySelector(".scroll-content")['style'].marginTop = this.headerHeight;
			document.querySelector(".scroll-content")['style'].marginBottom = this.tabBarHeight;
			//document.querySelector(".scroll-content")['style'].transition = 'margin 0.7s linear';	
		}
	}
}
