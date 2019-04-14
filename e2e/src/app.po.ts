import { browser, by, element, promise as wdpromise } from 'protractor';

export class AppPage {
  public navigateTo(): wdpromise.Promise<any> {
    return browser.get('/');
  }

  public getParagraphText(): any {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
