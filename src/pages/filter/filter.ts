import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
	selector: 'page-filter',
	templateUrl: 'filter.html'
})
export class FilterPage {
	characteristics: Array<{any}> = [];
	
	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private api: ApiService,
		private global: GlobalService
	) {
		let category = this.global.getCategory();
		if (category) {
			this.api.fetchCategory(category.item.id, (response) => {
				console.log(response);
				this.characteristics = response.data.characteristics;
			}, (err) => {
			});
		}
	}

	dismiss() {
		this.viewCtrl.dismiss({submitted: false});
	}
}
