import { Component } from '@angular/core';
import { 
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular';

import {isNumeric} from 'rxjs/util/isNumeric';

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
	category: any;
	price: any = {
		from: null,
		to: null
	};
	range: number = 25;

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
		this.category = category;
		console.log(this.category);	
	}

	priceFromChanged(event) {
		if (isNumeric(event.value)) {
			let n = Number(event.value);
			if (n > 0) {
				event.value = n;
			}
			else {
				event.value = 0;
			}
		} else {
			event.value = 0;
		}
	}

	priceToChanged(event) {
		if (isNumeric(event.value)) {
			let n = Number(event.value);
			if (n > 0) {
				event.value = n;
			}
			else {
				event.value = 0;
			}
		} else {
			event.value = 0;
		}
	}

	rangeChanged(event): void {
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

	openCategories() {
		console.log('openCategories');
/*
		let selectCategoryModal = this.modalCtrl.create(CategoryPage);
		selectCategoryModal.onDidDismiss(data => {
			if (data.submitted) {
				this.global.toggleCategory();
			}
		});
		selectCategoryModal.present();
*/
	}

	openLocation() {
		console.log('openLocation');
	}

	resetAllFilters() {
		this.global.resetFilter();
		this.viewCtrl.dismiss({submitted: true});
	}
}
