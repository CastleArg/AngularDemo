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
  public currentAdUrl = `${this.baseUrl}/ad/?r=${Math.floor(Math.random() * 1000)}`;
  public byteData;
  public products = new Array<Product>();
  public adFrequency = 5;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get(`${this.baseUrl}/api/products`)
      //.toPromise()
      //.map((x)=>x.json())
      .subscribe(products => {
        let realJson = `[${products.text().replace(/\n/g, ",").slice(0, -1)}]`;//todo tidy/encapsulate
        console.log(realJson);
        this.products = this.products.concat(JSON.parse(realJson));//todo stream one by one.
        console.log(this.products);
      })
  }
}
