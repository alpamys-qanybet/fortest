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
	categoryList: Array<{any}>;
	current: any;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private global: GlobalService
	) {
		let category = this.global.getCategory();
		if (category) {
			this.current = category.id;
		}
		let loader = this.loadingCtrl.create();
		
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
			this.global.setCategory(item);
			this.viewCtrl.dismiss({submitted: true});
		}
		else {
			this.navCtrl.push(SubcategoryPage, {
				item: item,
				current: this.current
			});
		}
	}

	selectAll(event) {
		this.global.clearCategory();
		this.viewCtrl.dismiss({submitted: true});
	}

	dismiss() {
		this.viewCtrl.dismiss({submitted: false});
	}
}
