import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-favourite',
	templateUrl: 'favourite.html'
})
export class FavouritePage {

	somethings: any = new Array(20);

	constructor(public navCtrl: NavController) {
	}

}
