import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content h1')).getText() as Promise<string>;
  }

  getLogginButon(): ElementFinder {
    return element(by.buttonText('Login'));
  }

  getUserInput(): ElementFinder {
    return element(by.id('iusername'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.id('ipassword'));
  }
}
