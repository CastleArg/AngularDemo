import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from './product.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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

  // it is possibly more correct to separately test the two methods in the product component
  // however these tests seem simple enough to assert that the component does it's complete job.

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display full date when 7 days ago', () => {
    component.now = new Date('Tue Jul 24 2017 16:26:40 GMT+1200 (NZST)');
    component.product.date = 'Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)';
    // locale can be different when running tests on different machines, so convert to current locale.
    expect(component.getDateString()).toEqual(new Date('2017-07-17:00:00:00Z').toLocaleDateString());
  });

  it('should display full date when more than 7 days ago', () => {
    component.now = new Date('Tue Jul 25 2017 16:26:40 GMT+1200 (NZST)');
    component.product.date = 'Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)';
    expect(component.getDateString()).toEqual(new Date('2017-07-17:00:00:00Z').toLocaleDateString());
  });

  it('should display number of days when fewer than than 7 days ago', () => {
    component.now = new Date('Tue Jul 23 2017 15:25:40 GMT+1200 (NZST)');
    component.product.date = 'Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)';
    expect(component.getDateString()).toEqual('6 days ago');
  });

  it('should display number of days when 1 day ago', () => {
    component.now = new Date('Tue Jul 18 2017 15:25:40 GMT+1200 (NZST)');
    component.product.date = 'Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)';
    expect(component.getDateString()).toEqual('1 day ago');
  });

  it('should display today when today', () => {
    component.now = new Date('Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)');
    component.product.date = 'Tue Jul 17 2017 16:26:40 GMT+1200 (NZST)';
    expect(component.getDateString()).toEqual('today');
  });

  it('should display face actual size', () => {
    component.product.size = 42;
    fixture.detectChanges();
    const faceElement = fixture.debugElement.query(By.css('.face')).nativeElement;
    expect(faceElement.style.fontSize).toBe('42px');
  });
});

function getTestProduct(): Product {
  const product: Product = {
    face: `"( .o.)"`, id: '1-r7180g1wv4s22sswuhfo5hfr',
    size: 27, price: 76, date: 'Tue Jul 11 2017 16:26:40 GMT+1200 (NZST)'
  };
  return product;
}


