import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-bar-code-result',
  templateUrl: 'bar-code-result.html'
})
export class BarCodeResultPage {

public barCodeResults:{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  
this.barCodeResults = this.navParams.get('barCodeResults');//get a barcode params

  }

}
