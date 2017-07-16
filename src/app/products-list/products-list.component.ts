import { Component, OnInit, HostListener } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Product } from "../product/product.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/toPromise';
import { SortMode } from "./sort-mode.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  static baseUrl = 'http://localhost:8000';
  public static currentAdUrl: string;

  public products = new Array<Product>();
  public nextProducts = new Array<Product>();//stored to display at end of page
  public adFrequency = 20;
  public isLoading = false;
  private batchSize = 20;
  public sortMode = SortMode//we need a public property so we can bind in the template.
  public selectedSortMode: SortMode = SortMode.id;
  public endReached = false;
  public hasError = false;

  constructor(private http: Http) { }

  ngOnInit() {
    this.subscribeToScroll();
    this.getProducts();
  }

  subscribeToScroll() {
    const listElement = document.getElementById('products-list');
    Observable.fromEvent(listElement, 'wheel')
      .debounceTime(10)//prevent spam
      .subscribe((event) => {
        if (window.innerHeight + window.pageYOffset === document.documentElement.scrollHeight && !this.isLoading) {
          this.products = this.products.concat(this.nextProducts);
          this.nextProducts = [];
          this.getProducts();
        }
      });
  }

  getProducts() {
    this.isLoading = true;
    let amountToFetch = this.batchSize * 2;//We get twice as many as required and save half for later.
    this.http.get(`${ProductsListComponent.baseUrl}/api/products?sort=${SortMode[this.selectedSortMode]}&limit=${amountToFetch}&skip=${this.products.length}`)//todo constant/config file.
      .subscribe(products => {
        //swap the newlines for commas for now, put in an array and chop the last comma
        let commaDelimitedString = `[${products.text().replace(/\n/g, ",").slice(0, -1)}]`;
        let theJSON = JSON.parse(commaDelimitedString);
        if (theJSON.length < amountToFetch) {
          this.endReached = true;
        }
        this.products = this.products.concat(theJSON.slice(0, this.batchSize));//todo possibly can use the newlines for one by one streaming
        this.nextProducts = theJSON.slice(this.batchSize);//store the second batch for later!
        this.isLoading = false;
      },
      err => this.hasError = true)
  }

  public static getAdUrl(): string {
    let url = `${this.baseUrl}/ad/?r=${Math.floor(Math.random() * 1000)}`;
    //don't retun the same one twice in a row.
    if (url !== ProductsListComponent.currentAdUrl) {
      ProductsListComponent.currentAdUrl = url;
      return url;
    }
    return this.getAdUrl();
  }

  setSortMode(sortMode: SortMode) {
    this.selectedSortMode = sortMode;
    this.products = [];
    this.getProducts();
  }
}
