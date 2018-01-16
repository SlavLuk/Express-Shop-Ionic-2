import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html'
})
export class ShoppingCartPage {

fireItems: FirebaseListObservable<any[]>;
products:any;
name:string;
totalToString:string = '0';
count:number = 0;
total:number = 0;
itemId:any[]=[];

  constructor(public loadingCtrl: LoadingController,private alertCtrl:AlertController,private af: AngularFire,public navCtrl: NavController, public navParams: NavParams) {

   this.fireItems = this.af.database.list('/fireItems');

  }


  ionViewDidLoad() {
   
this.addAmount(this.total);
   
  }


addAmount(amn:number){
this.total = 0;
this.totalToString = '0';
 
this.fireItems.subscribe(items => {
    // items is an array
    items.forEach(item => {

   this.total += item.total;
   this.totalToString = this.total.toFixed(2);
    
});

});
}




  removeItem(name){

     this.fireItems.remove(name);

     this.addAmount(this.total);

   }//end remove


   showPrompt() {
    let prompt = this.alertCtrl.create({
      title:"Credit card details",
  
      inputs: [
        {
      
          type:'text',
          name: 'fname',
          placeholder: 'First name'
        },
           {
         type:'text',
          name: 'sname',
          placeholder: 'Second name'
        },
           {
          type:'number',
          name: 'creditnumber',
          placeholder: 'Credit card number'
        },  
        {
          type:'number',
          name: 'date',
          placeholder: 'mm/yyyy'
        },
         {
          type:'number',
          name: 'secnumber',
          placeholder: 'Security number on the back'
        }



      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          
          }
        },
        {
          text: 'Pay',
          handler: data => {

      let loader = this.loadingCtrl.create({

      content: "Processing your transaction...",

      duration: 1500

    });

    loader.present();

    this.fireItems.subscribe(items => {
    // items is an array
    items.forEach(item => {

this.itemId.push(item.$key);

  
    
});

});
 this.removeData(this.itemId);
          }

         
        }
      ]
    });
    prompt.present();
 
  }//end prompt alert

removeData(id){

for(let i in id){
  
    this.fireItems.remove(id[i]);
}

this.total = 0;
this.totalToString = '0';

};

}
