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

  ngOnInit() {
    this.dateString = this.getDateString();
  }

  getDateString() {
    const now = new Date();
    const productDate = new Date(this.product.date);
    const daysElapsed = this.calculateDaysElapsed(now, productDate);

    return daysElapsed <= 7 ? `${daysElapsed} days ago` : new Date(this.product.date).toLocaleDateString();
  }

  calculateDaysElapsed(a: Date, b: Date): number {
    const dayMs = 1000 * 60 * 60 * 24;
    const aMs = a.getTime();
    const bMs = b.getTime();
    const differenceMs = aMs - bMs;
    return Math.round(differenceMs / dayMs);
  }
}
