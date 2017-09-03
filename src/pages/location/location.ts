import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	LoadingController,
	ViewController
} from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

import { SublocationPage } from './sublocation';

@Component({
	selector: 'page-location',
	templateUrl: 'location.html'
})
export class LocationPage {
	locationList: Array<{any}>;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private global: GlobalService
	) {

		let loader = this.loadingCtrl.create();
		this.api.getLocationRoot().subscribe( response => {
			this.locationList = response;
			loader.dismiss();
		});
	}

	itemTapped(event, item) {
		if (item.hasChildren == 0) {
			this.global.setLocation(item);
			// this.navCtrl.setRoot(ShopFilterPage);
			// this.menuCtrl.close('right');
			this.viewCtrl.dismiss({submitted: true});
		}
		else {
			this.navCtrl.push(SublocationPage, {
				item: item
			});
		}
	}

	dismiss() {
		this.viewCtrl.dismiss({submitted: false});
	}
}
