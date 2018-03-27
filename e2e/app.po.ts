import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getGameNameText() {
    return element(by.css('p.game-name')).getText();
  }

  getStartGameButton() {
    return element(by.id('start-game-button'));
  }

  getRestartButton() {
    return element(by.id('restart-button'));
  }

  getRestartButtonText() {
    return element(by.id('restart-button')).getText();
  }
}
