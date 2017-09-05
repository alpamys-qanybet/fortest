import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
	selector: 'page-favourite',
	templateUrl: 'favourite.html'
})
export class FavouritePage {
	
	@ViewChild(Content) content: Content;

	somethings: any = new Array(20);

	constructor(public navCtrl: NavController) {
	}

}
