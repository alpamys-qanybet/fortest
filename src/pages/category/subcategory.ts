import { Component } from '@angular/core';

import {
	NavController,
	NavParams,
	LoadingController
} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
	selector: 'subcategory-page',
	templateUrl: 'subcategory.html'
})
export class SubcategoryPage {
	selectedItem: any;
	categoryList: Array<{any}>;
	current: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loadingCtrl: LoadingController,
		private api: ApiService,
		private global: GlobalService
	) {
		this.selectedItem = navParams.get('item');
		this.current = navParams.get('current');

		let loader = this.loadingCtrl.create();
		loader.present();
		this.api.fetchSubCategory(this.selectedItem.id, (response) => {
			let list = [];

			for (let item of response.data.categories) {
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
			this.dismiss();
		}
		else {
			this.navCtrl.push(SubcategoryPage, {
				item: item,
				current: this.current
			});
		}
	}

	selectAll(event) {
		this.global.setCategory(this.selectedItem);
		this.dismiss();
	}

	dismiss() {
		let firstViewCtrl = this.navCtrl.first();
		this.navCtrl.popToRoot({animate: false}).then(() => firstViewCtrl.dismiss({submitted: true}));	
	}
}
