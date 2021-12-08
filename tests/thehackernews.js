const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const { expect } = require('chai');
const { before } = require('mocha');

describe('Verify that The Hacker News logo exists', async () => {
  var driver = new Builder().forBrowser('chrome').setChromeOptions().build();

  before(() => {
    driver.get('https://google.com/');
  });

  after(async () => {
    driver.quit();
  });

  it('Should navigate to Google', async () => {
    const title = driver.getTitle();
    expect(await title).to.equal('Google');
  });

  it('Should agree Google cookies policy', async () => {
    const agreePolicyButton = driver.findElement(
      By.xpath(
        '//div[contains(text(), "I agree")] | //div[contains(text(), "Sutinku")]'
      )
    );

    agreePolicyButton.click();
  });

  it('Should search for "www.thehackernews.com"', async () => {
    const googleInput = driver.findElement(By.xpath('//input[@type="text"]'));
    await googleInput.sendKeys('www.thehackernews.com');
    await googleInput.submit();
  });

  it('Should enter to the "www.thehackernews.com" page', async () => {
    const firstSearchResult = By.xpath(
      '//a[@href="https://thehackernews.com/"]'
    );

    await driver.wait(until.elementsLocated(firstSearchResult));
    driver.findElement(firstSearchResult).click();
  });

  it('Should accept cookies policy in The Hacker News website', async () => {
    const agreementButton = By.xpath(
      '//button[@role="button" and p="Consent"]'
    );

    await driver.wait(until.elementLocated(agreementButton));
    driver.findElement(agreementButton).click();
  });

  it('Validate that logo exists in The Hacker News website', () => {
    const siteLogo = driver.findElement(By.xpath('//div[2]/div[1]/a/img'));
    expect(siteLogo).not.to.be.empty;
  });
});
