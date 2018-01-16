import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {MyLocations} from '../../providers/locations';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { AlertController } from 'ionic-angular';
import {ShoplocationPage} from '../shoplocation/shoplocation';
import {HelloIonicPage} from '../search/hello-ionic';
import{BarCodeResultPage}from '../bar-code-result/bar-code-result';
import { LoadingController } from 'ionic-angular';
import{ShoppingCartPage} from '../cart/shopping-cart';
import{BarcodeScanner,BarcodeScannerOptions}from '@ionic-native/barcode-scanner';
import{Subject} from 'rxjs/Subject';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
    .card {
      height: 33%;
      width: 100%;
    }
   .card img{
       height: 100%;
      width: 100%;
    }
  `]

})
export class HomePage {

@ViewChild(Slides) slides: Slides;

//variables declaration
public posts: FirebaseListObservable<any>;
public searchProductString:string =''||"new";
public click:boolean=false;
public options:BarcodeScannerOptions;
public results :any[];
public searchTerm = new Subject<string>();
public  locations:any[];
public latiT:any;
public longT:any;
public barCodeResults:{};
public option:BarcodeScannerOptions;

  constructor(private barcode:BarcodeScanner,public loadingCtrl: LoadingController,public af: AngularFire,public navCtrl: NavController, 
  public navParams: NavParams,private myLocations:MyLocations,public alertCtrl: AlertController) {


  }   

   ionViewDidLoad(){

  this.myLocations.search(this.searchTerm)//async method getting results from http request
         .subscribe(results=>{

        this.results=results.results;

        this.locations =this.results;

    });

   }


cart(){

  this.navCtrl.push(ShoppingCartPage);//navigate to cart page

}

 search(){
    

this.navCtrl.push(ShoplocationPage,{

    storeLocations:this.locations//passing params to another page

});

}

doSearch(){//hide or show search bar

this.click = !this.click;


}

async goBarScan(){

  this.option = {

prompt:'Scan a barcode to see a result!'

  }
 
 this.barCodeResults = await this.barcode.scan(this.option);//get barcode results

  if(this.barCodeResults!=0){

this.navCtrl.push(BarCodeResultPage,{

  barCodeResults:this.barCodeResults


})


  }

}


goSearch(){//navigate to another page

  this.navCtrl.push(HelloIonicPage);

     let loader = this.loadingCtrl.create({
      content: "Loading good stuff...",
      duration: 1500
    });
    loader.present();
  

 

}





}
