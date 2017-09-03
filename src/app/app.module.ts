import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GlobalService } from './services/global.service';
import { ApiService } from './services/api.service';
import { MockService } from './services/mock.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { SubcategoryPage } from '../pages/category/subcategory';
import { FilterPage } from '../pages/filter/filter';
import { LocationPage } from '../pages/location/location';
import { SublocationPage } from '../pages/location/sublocation';
import { FavouritePage } from '../pages/favourite/favourite';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CategoryPage,
    SubcategoryPage,
    FilterPage,
    LocationPage,
    SublocationPage,
    FavouritePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
  //    menuType: 'reveal'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CategoryPage,
    SubcategoryPage,
    FilterPage,
    LocationPage,
    SublocationPage,
    FavouritePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalService,
    ApiService,
    MockService
  ]
})
export class AppModule {}
