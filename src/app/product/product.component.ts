import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  public dateString;
  public now = new Date(); // made public for testablilty

  ngOnInit() {
    this.dateString = this.getDateString();
  }

  getDateString() {
    const productDate = new Date(this.product.date);
    const daysElapsed = this.calculateDaysElapsed(this.now, productDate);
    if (daysElapsed === 0) {
      return 'today';
    }
    if (daysElapsed === 1) {
      return `${daysElapsed} day ago`;
    }
    if (daysElapsed < 7) {
      return `${daysElapsed} days ago`;
    }
    return new Date(this.product.date).toLocaleDateString();
  }

  calculateDaysElapsed(a: Date, b: Date): number {
    const dayMs = 1000 * 60 * 60 * 24;
    const aMs = a.getTime();
    const bMs = b.getTime();
    const differenceMs = aMs - bMs;
    return Math.round(differenceMs / dayMs);
  }
}
