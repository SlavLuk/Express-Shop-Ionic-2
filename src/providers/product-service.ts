import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';



@Injectable()
export class ProductService {

   baseUrl: string = 'https://dev.tescolabs.com/grocery/products/?query=';
   term:string;

public data:any;


  constructor(public http: Http) {
  
  }


 search(terms: Observable<string>) {

    return terms.debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

   searchEntries(term) {
       
        if(term ===""){

            term="any";
        }


        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Ocp-Apim-Subscription-Key','d5d09f04596a41d6b8a13fb1084248d2');
        let options = new RequestOptions({ headers: headers });

            return this.http
                .get(this.baseUrl  + term+'&offset=0&limit=50',options)
                .map(res => res.json());
  }





}
