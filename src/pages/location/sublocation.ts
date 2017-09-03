import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
	selector: 'sublocation-page',
	templateUrl: 'sublocation.html'
})
export class SublocationPage {
	selectedItem: any;
	locationList: Array<{any}>;

	constructor(
		public menuCtrl: MenuController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private loadingCtrl: LoadingController,
		private api: ApiService,
		private global: GlobalService
	) {
		this.selectedItem = navParams.get('item');

		let loader = this.loadingCtrl.create();
		loader.present();
		if (this.selectedItem) {
			this.api.getLocationChildren(this.selectedItem.id).subscribe( response => {
				this.locationList = response;
				loader.dismiss();
			});
		}
/*		
		else {
			this.api.getLocationRoot().subscribe( response => {
				this.locationList = response;
				loader.dismiss();
			});
		}
*/
	}

	itemTapped(event, item) {
		if (item.hasChildren == 0) {
			this.global.setLocation(item);
			this.dismiss();
		}
		else {
			this.navCtrl.push(SublocationPage, {
				item: item
			});
		}
	}

	selectAll(event) {
		this.global.setLocation(this.selectedItem);
		this.dismiss();
	}

	dismiss() {
		let firstViewCtrl = this.navCtrl.first();
		this.navCtrl.popToRoot({animate: false}).then(() => firstViewCtrl.dismiss());	
	}
}
