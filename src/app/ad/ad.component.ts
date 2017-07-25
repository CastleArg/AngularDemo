import { Component, OnInit, Input } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html'
})
export class AdComponent implements OnInit {
  public readonly url: string = ProductsListComponent.getAdUrl();
  constructor() { }
  ngOnInit() {
  }
}
