import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Product } from "../product/product.model";
import * as rxjs from "rxjs";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  private baseUrl = 'http://localhost:8000';
  public currentAdUrl:string;
  public products = new Array<Product>();
  public adFrequency = 3;
  public isLoading = false;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.http.get(`${this.baseUrl}/api/products`)//todo constant/config file.
      .subscribe(products => {
        //swap the newlines for commas for now, put in an array and chop the last comma
        let realJson = `[${products.text().replace(/\n/g, ",").slice(0, -1)}]`;
        this.products = this.products.concat(JSON.parse(realJson));//todo render one by one if possible.
        console.log(this.products);
        this.isLoading = false;
      })
  }

  getAdUrl() : string{
    let url = `${this.baseUrl}/ad/?r=${Math.floor(Math.random() * 1000)}`;
    //don't retun the same one twice in a row.
    if (url !== this.currentAdUrl){
     // this.currentAdUrl = url;
      return url;
    }
    console.log('same one twice, get againg');
    this.getAdUrl();
  }
}
