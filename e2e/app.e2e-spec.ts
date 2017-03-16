import { RedirectproAppUiPage } from './app.po';

describe('redirectpro-app-ui App', () => {
  let page: RedirectproAppUiPage;

  beforeEach(() => {
    page = new RedirectproAppUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
