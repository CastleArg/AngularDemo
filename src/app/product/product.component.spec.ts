import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from './product.model';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = getTestProduct();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });



});

function getTestProduct(): Product {
  const product: Product = {
    face: `"( .o.)"`, id: '1-r7180g1wv4s22sswuhfo5hfr',
    size: 27, price: 76, date: 'Tue Jul 11 2017 16:26:40 GMT+1200 (NZST)'
  };
  return product;
}


