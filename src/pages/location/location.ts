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
	isModal: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private global: GlobalService
	) {
		this.isModal = navParams.get('isModal');

		let loader = this.loadingCtrl.create();
		this.api.getLocationRoot().subscribe( response => {
			this.locationList = response;
			loader.dismiss();
		});
	}

	itemTapped(event, item) {
		if (item.hasChildren == 0) {
			this.global.setLocation(item);
			
			if (this.isModal) {
				this.viewCtrl.dismiss({submitted: true});
			}
			else {
				this.navCtrl.pop();
			}
		}
		else {
			this.navCtrl.push(SublocationPage, {
				item: item,
				isModal: this.isModal
			});
		}
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
