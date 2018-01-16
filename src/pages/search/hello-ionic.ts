import { Component } from '@angular/core';
import {ProductService} from '../../providers/product-service';
import {ItemDetailsPage} from '../item-details/item-details';
import { NavController, NavParams } from 'ionic-angular';
import{Subject} from 'rxjs/Subject';
import{ShoppingCartPage} from '../cart/shopping-cart';


@Component({
  selector: 'page-grocery-search',
  templateUrl: 'hello-ionic.html'
  
})



export class HelloIonicPage  {

  public selectedItem: any;
 public results :any[];
 public searchTerm = new Subject<string>();
 public  products:any[];
   

  constructor(public productService: ProductService,public navCtrl: NavController, public navParams: NavParams) {


  }

  cart(){

  this.navCtrl.push(ShoppingCartPage);

}

  
  ionViewDidLoad(){

    this.productService.search(this.searchTerm)
         .subscribe(results=>{

        this.results=results.uk.ghs.products.results;

        this.products =this.results;

     

    });

  }


    itemTapped(event, item) {

    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}








