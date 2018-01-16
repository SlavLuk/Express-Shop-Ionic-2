import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/search/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import{ HomePage } from '../pages/home/home';
import{ShoplocationPage}from '../pages/shoplocation/shoplocation';
import{ShoppingCartPage}from '../pages/cart/shopping-cart';
import {ProductService} from '../providers/product-service';
import{MyLocations} from'../providers/locations';
import{BarCodeResultPage}from'../pages/bar-code-result/bar-code-result';
import{BarcodeScanner} from '@ionic-native/barcode-scanner';
import{GoogleMaps} from '@ionic-native/google-maps';


  var config = {
    apiKey: "AIzaSyAfok4shM08M11rn-WdeqLxLANtgws_wYY",
    authDomain: "expressshop-d242a.firebaseapp.com",
    databaseURL: "https://expressshop-d242a.firebaseio.com",
    storageBucket: "expressshop-d242a.appspot.com",
    messagingSenderId: "146360110263"
  };


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    HomePage,
    ShoplocationPage,
    ShoppingCartPage,
    BarCodeResultPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{mode:'md'}),
     AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    HomePage,
    ShoplocationPage,
    ShoppingCartPage,
    BarCodeResultPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},ProductService,BarcodeScanner,MyLocations,GoogleMaps

    ]
})
export class AppModule {}
