import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	LoadingController,
	ViewController
} from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

import { SubcategoryPage } from './subcategory';

@Component({
	selector: 'page-category',
	templateUrl: 'category.html'
})
export class CategoryPage {
	
	isModal: boolean;
	categoryList: Array<{any}>;
	current: any;
	rootInPath: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private global: GlobalService
	) {
		this.isModal = navParams.get('isModal');
		
		let f = this.global.getFilter();
		
		if (f.has('category')) {
			this.current = f.get('category').item.id;
			this.rootInPath = f.get('category').path[0].id;
		}

		let loader = this.loadingCtrl.create();
		loader.present();
		
		this.api.fetchCategoryRoot((response) => {
			let list = [];

			for (let item of response.data) {
				list.push({
					id: item.id,
					slug: item.slug,
					name: item.name,
					is_parent: item.is_parent
				});
			}
			this.categoryList = list;
			loader.dismiss();
		}, (err) => {
			loader.dismiss();
		});
	}

	itemTapped(event, item) {
		if (item.is_parent == 0) {
			this.global.setCategory({
				item: item,
				path: [item]
			});
			
			if (this.isModal) {
				this.viewCtrl.dismiss({submitted: true});
			}
			else {
				this.navCtrl.pop();
			}
		}
		else {
			this.navCtrl.push(SubcategoryPage, {
				isModal: this.isModal,
				item: item,
				path: [item],
				current: this.current
			});
		}
	}

	selectAll(event) {
		this.global.clearCategory();
		this.viewCtrl.dismiss({submitted: true});
	}

	dismiss() {
		if (this.isModal) {
			this.viewCtrl.dismiss({submitted: false});
		}
		else {
			this.navCtrl.pop();
		}
	}
}
