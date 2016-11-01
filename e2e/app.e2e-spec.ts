import { BallClockPage } from './app.po';

describe('ball-clock App', function() {
  let page: BallClockPage;

  beforeEach(() => {
    page = new BallClockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
