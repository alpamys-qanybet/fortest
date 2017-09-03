import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
	selector: 'page-characteristics',
	templateUrl: 'characteristics.html'
})
export class CharacteristicsPage {
	characteristics: any;
	selected: any;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private api: ApiService,
		private global: GlobalService
	) {
		this.characteristics =  navParams.get('characteristics');
		let selected = navParams.get('selected');
		if (selected) {
			this.selected = selected.id;
		} else {
			this.selected = null;
		}
	}

	selectCharacter(event, item) {
		this.global.setCharacter(item);
		this.navCtrl.pop();
		// this.dismiss();
	}

	selectAll(event) {
		this.global.removeCharacter(this.characteristics.id);
		this.navCtrl.pop();
	}

/*
	dismiss() {
		let firstViewCtrl = this.navCtrl.first();
		this.navCtrl.popToRoot({animate: false}).then(() => {
			// bla bla here
		}));
	}
*/
}
