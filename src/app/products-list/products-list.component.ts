
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import {debounceTime} from 'rxjs/operators';
import { Component, OnInit, HostListener } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Product } from '../product/product.model';



import { SortMode } from './sort-mode.model';
import Helpers from '../Helpers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products = new Array<Product>();
  public nextProducts = new Array<Product>(); // stored to display at end of page
  public adFrequency = 20;
  public isLoading = false;
  public batchSize = 20;
  public sortMode = SortMode; // we need a public reference to the enum so we can bind in the template.
  public selectedSortMode: SortMode = SortMode.id;
  public endReached = false;
  public hasError = false;

  constructor(private http: Http) { }

  ngOnInit() {
    this.subscribeToScroll();
    this.getProducts();
  }

  subscribeToScroll() {
    observableFromEvent(window, 'wheel').pipe(
      debounceTime(10))// prevent spam
      .subscribe((event) => {
        console.log(document.documentElement.scrollHeight);
        if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight && !this.isLoading) {
          this.products = this.products.concat(this.nextProducts);
          this.nextProducts = [];
          this.getProducts();
        }
      });
  }

  getProducts() {
    this.isLoading = true;
    const amountToFetch = this.batchSize * 2; // We get twice as many as required and save half for later.
    this.http
      // tslint:disable-next-line:max-line-length
      .get(`${Helpers.BaseUrl}/api/products?sort=${SortMode[this.selectedSortMode]}&limit=${amountToFetch}&skip=${this.products.length}`)
      .subscribe(products => {
        // swap the newlines for commas for now, put in an array and chop the last comma
        const commaDelimitedString = `[${products.text().replace(/\n/g, ',').slice(0, -1)}]`;
        const theJSON = JSON.parse(commaDelimitedString);
        if (theJSON.length < amountToFetch) {
          this.endReached = true;
        }
        this.products = this.products.concat(theJSON.slice(0, this.batchSize));
        // todo possibly can use the newlines for one by one streaming
        this.nextProducts = theJSON.slice(this.batchSize); // store the second batch for later!
        this.isLoading = false;
      },
      err => this.hasError = true);
  }

  setSortMode(sortMode: SortMode) {
    this.selectedSortMode = sortMode;
    this.products = [];
    this.getProducts();
  }
}
