import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductsListComponent } from "../products-list/products-list.component";
@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  public readonly url: string = ProductsListComponent.getAdUrl();
  constructor() { }
  ngOnInit() {
  }
}
