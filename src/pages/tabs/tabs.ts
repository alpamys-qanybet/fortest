import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FavouritePage } from '../favourite/favourite';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabFavourite = FavouritePage;
  tabPost = AboutPage;
  tabProfile = ContactPage;

  constructor() {

  }
}
