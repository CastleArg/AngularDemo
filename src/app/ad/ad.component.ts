import { Component, OnInit, Input } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import Helpers from '../Helpers';
@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html'
})
export class AdComponent implements OnInit {
  public static lastUrl: string;
  public myUrl: string;
  private static getAdUrl(): string {
    const url = `${Helpers.BaseUrl}/ad/?r=${Math.floor(Math.random() * 1000)}`;
    // don't retun the same one twice in a row.
    if (url !== AdComponent.lastUrl) {
      AdComponent.lastUrl = url;
      return url;
    }
    return this.getAdUrl();
  }
  constructor() { }
  ngOnInit() {
    this.myUrl = AdComponent.getAdUrl();
  }
}
