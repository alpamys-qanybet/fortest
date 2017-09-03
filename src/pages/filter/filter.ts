import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';
import { GlobalService } from '../../app/services/global.service';

import { CharacteristicsPage } from './characteristics';

@Component({
	selector: 'page-filter',
	templateUrl: 'filter.html'
})
export class FilterPage {
	characteristics: Array<{any}> = [];
	characteristicsFilter = new Map<number, any>(); // : Map<number, any>
	filterHasChange: boolean = false;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private api: ApiService,
		private global: GlobalService
	) {
		let category = this.global.getCategory();
		if (category) {
			this.api.fetchCategory(category.item.id, (response) => {
				this.characteristics = response.data.characteristics;

				this.characteristicsFilter.clear();
				let f = this.global.getFilter();
				if (f.has('characteristics')) {
					for (let v of f.get('characteristics')) {
						this.characteristicsFilter.set(v.character_id, v);
						this.global.setCharacter(v);
					}
				}

				this.global.characteristicsChange.subscribe((data) => {
					this.filterHasChange = true;
					this.reloadCharacteristicsValues();
				});	
			}, (err) => {
			});
		}
	}

	reloadCharacteristicsValues() {
		this.characteristicsFilter.clear();
		this.global.getCharacteristics().forEach ((v,k) => {
			this.characteristicsFilter.set(v.character_id, v);
		});
	}

	dismiss() {
		this.global.clearCharacteristics();
		this.viewCtrl.dismiss({submitted: false});
	}

	applyChanges() {
		this.viewCtrl.dismiss({submitted: true});
//		this.global.setFilterCharacteristics(this.global.getCharacteristics());
//		this.global.clearCharacteristics();
		this.global.setFilterCharacteristics();
	}

	openCharacteristics(event, item) {
		this.navCtrl.push(CharacteristicsPage, {
			characteristics: item,
			selected: this.characteristicsFilter.get(item.id)
		});
	}
}
