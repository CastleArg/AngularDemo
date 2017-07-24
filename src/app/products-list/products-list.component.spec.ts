import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductComponent } from '../product/product.component';
import { AdComponent } from '../ad/ad.component';
import { HttpModule, BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { Product } from '../product/product.model';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListComponent, ProductComponent, AdComponent ],
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options)
        }
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     const backend = TestBed.get(MockBackend);
     backend.connections.subscribe(c => {
                    c.mockRespond(new Response(new ResponseOptions({body: mockResponseBody})));
                });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should convert products response to JSON array', () => {
    component.getProducts();
    expect(component.products).toEqual(expectedProducts);
  });

  it('should store half the response for later', () => {
    component.batchSize = 2;
    component.getProducts();
    expect(component.products.length).toEqual(2);
    expect(component.nextProducts.length).toEqual(2);
  });

  it('should set end reached flag true if fewer than expected products returned', () => {
    component.batchSize = 5;
    component.getProducts();
    expect(component.endReached).toEqual(true);
  });

   it('should set end reached flag false if expected number of products returned', () => {
    component.batchSize = 2;
    component.getProducts();
    expect(component.endReached).toEqual(false);
  });
});

const mockResponseBody =
  `{"id":"10-xpv436oadeazrod65zi307ldi","size":15,"price":473,"face":"(¬º-°)¬","date":"Thu Jul 13 2017 10:05:48 GMT+1200 (NZST)"}
{"id":"11-b3wok8libqzg0eah1f4njc3di","size":39,"price":624,"face":"(¬‿¬)","date":"Sun Jul 23 2017 05:43:12 GMT+1200 (NZST)"}
{"id":"12-6ns8rorch8v0qiqxln6yywg66r","size":17,"price":473,"face":"(°ロ°)☝","date":"Tue Jul 11 2017 13:35:01 GMT+1200 (NZST)"}
{"id":"13-tg22nro51340qumrejcg6tj4i","size":34,"price":542,"face":"(´・ω・)っ","date":"Thu Jul 13 2017 02:53:23 GMT+1200 (NZST)"}
`;

const expectedProducts: Product[] =
  [{ 'id': '10-xpv436oadeazrod65zi307ldi', 'size': 15, 'price': 473, 'face': '(¬º-°)¬', 'date': 'Thu Jul 13 2017 10:05:48 GMT+1200 (NZST)'},
  { 'id': '11-b3wok8libqzg0eah1f4njc3di', 'size': 39, 'price': 624, 'face': '(¬‿¬)', 'date': 'Sun Jul 23 2017 05:43:12 GMT+1200 (NZST)'},
  { 'id': '12-6ns8rorch8v0qiqxln6yywg66r', 'size': 17, 'price': 473, 'face': '(°ロ°)☝', 'date': 'Tue Jul 11 2017 13:35:01 GMT+1200 (NZST)'},
  { 'id': '13-tg22nro51340qumrejcg6tj4i', 'size': 34, 'price': 542, 'face': '(´・ω・)っ', 'date': 'Thu Jul 13 2017 02:53:23 GMT+1200 (NZST)'}];



