import { UIPage } from './app.po';
import { element, by, browser } from 'protractor/built';

describe('ui App', () => {
  let page: UIPage;

  beforeEach(() => {
    page = new UIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Discount Ascii Warehouse');
  });

  it('should display product list', () => {
    page.navigateTo();
    // expect(page.getProductList()).isDisplayed().toBeTruthy();
  });
});
