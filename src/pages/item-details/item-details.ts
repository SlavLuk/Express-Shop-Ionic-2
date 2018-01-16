import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShoppingCartPage} from '../cart/shopping-cart';
import { AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
  
})
export class ItemDetailsPage {

//variables declaration
  public fireItems: FirebaseListObservable<any[]>;
  public selectedItem: any;
  public counter:number =0;
  public total:number = 0;
  public itemId:any;

  constructor(private af: AngularFire,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  this.counter =0;
    this.fireItems = af.database.list('/fireItems');
}


  cart(){

  this.navCtrl.push(ShoppingCartPage);

}

addAmount(){

this.counter++;


}
removeAmount(){

  if(this.counter == 0){

this.counter = 0;

  }else{
this.counter--;
  }

}


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry,invalid input',
      subTitle: 'Please enter a quantity!',
      buttons: ['OK']
    });
    alert.present();
  }

addItem(){

if(this.counter !=0){

 this.total = this.selectedItem.price*this.counter;

      this.fireItems.push({//saving items to firebase

         name:this.selectedItem.name,
         image:this.selectedItem.image,
           price:this.selectedItem.price,
           counter:this.counter,
           total:this.total
 
      }    
        );

this.navCtrl.push(ShoppingCartPage);

}else{

this.showAlert();
  
}
 
  

}


}

export class Item{

image:string;
name:string;
price:number = 0;
counter:number = 0;
total:number = 0;

constructor(image,name,price,counter,total){

this.image = image;
this.name = name;
this.price=price;
this.counter = counter;
this.total = total;
}

}

