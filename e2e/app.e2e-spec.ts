import { RedirectUiClientPage } from './app.po';

describe('redirect-ui-client App', function() {
  let page: RedirectUiClientPage;

  beforeEach(() => {
    page = new RedirectUiClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
