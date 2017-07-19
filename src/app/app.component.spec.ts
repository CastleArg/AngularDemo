import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductComponent } from "./product/product.component";
import { Product } from "./product/product.model"
import { AdComponent } from "./ad/ad.component";
import { Http, HttpModule } from "@angular/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductsListComponent,
        ProductComponent,
        AdComponent,
        HeaderComponent
      ],
      imports: [
        HttpModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
