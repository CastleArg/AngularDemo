import { browser, by, element } from 'protractor';

export class UIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getProductList() {
    return element(by.id('products-list'));
  }

  getHeader() {
    return element(by.id('header'));
  }
}
