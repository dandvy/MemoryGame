import { AppPage } from './app.po';

describe('memory App general', () => {
  let page: AppPage = new AppPage();

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  it('display game name', () => {
    page.navigateTo();
    expect(page.getGameNameText()).toEqual('MEMORY GAME');
  });

  it('navigate to game page', () => {
    let startGameBtn = page.getStartGameButton();
    startGameBtn.click();
    expect(page.getRestartButtonText()).toEqual('Начать заново');
  });
});
