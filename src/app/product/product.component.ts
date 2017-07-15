import { Component, OnInit, Input } from '@angular/core';
import { Product } from "./product.model";
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  public dateString;

  ngOnInit() {
    this.dateString = this.getDateString()
  }

  getDateString() {
    let now = new Date();
    let productDate = new Date(this.product.date);
    let daysElapsed = this.calculateDaysElapsed(now, productDate);

    return daysElapsed <= 7 ? `${daysElapsed} days ago` : new Date(this.product.date).toLocaleDateString();
  }

  calculateDaysElapsed(a: Date, b: Date): number {
    var dayMs = 1000 * 60 * 60 * 24;
    var aMs = a.getTime();
    var bMs = b.getTime();
    var differenceMs = aMs - bMs;
    return Math.round(differenceMs / dayMs);
  }
}
