import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	section: string = 'two';
	somethings: any = new Array(20);

	constructor(public navCtrl: NavController) {

	}
}
