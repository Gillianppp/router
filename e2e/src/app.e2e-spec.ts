'use strict'; // necessary for es6 output in node

import { browser, element, by, ExpectedConditions } from 'protractor';

const numDashboardTabs = 5;
const numCrises = 4;
const numHeroes = 6;
const EC = ExpectedConditions;

describe('Router', () => {

  beforeAll(() => browser.get(''));

  function getPageStruct() {
    const hrefEles = element.all(by.css('app-root > nav a'));
    const surveyDetail = element.all(by.css('app-root > ng-component > ng-component > ng-component > div')).first();
    const heroDetail = element(by.css('app-root > ng-component > div'));

    return {
      hrefs: hrefEles,
      activeHref: element(by.css('app-root > nav a.active')),

      surveyHref: hrefEles.get(0),
      surveyList: element.all(by.css('app-root > ng-component > ng-component li')),
      surveyDetail: surveyDetail,
      surveyDetailTitle: surveyDetail.element(by.xpath('*[1]')),

      heroesHref: hrefEles.get(1),
      heroesList: element.all(by.css('app-root > ng-component li')),
      heroDetail: heroDetail,
      heroDetailTitle: heroDetail.element(by.xpath('*[1]')),

      adminHref: hrefEles.get(2),
      adminPreloadList: element.all(by.css('app-root > ng-component > ng-component > ul > li')),

      loginHref: hrefEles.get(3),
      loginButton: element.all(by.css('app-root > ng-component > p > button')),

      contactHref: hrefEles.get(4),
      contactCancelButton: element.all(by.buttonText('Cancel')),

      outletComponents: element.all(by.css('app-root > ng-component'))
    };
  }

  it('has expected dashboard tabs', () => {
    const page = getPageStruct();
    expect(page.hrefs.count()).toEqual(numDashboardTabs, 'dashboard tab count');
    expect(page.surveyHref.getText()).toEqual('survey Center');
    expect(page.heroesHref.getText()).toEqual('Heroes');
    expect(page.adminHref.getText()).toEqual('Admin');
    expect(page.loginHref.getText()).toEqual('Login');
    expect(page.contactHref.getText()).toEqual('Contact');
  });

  it('has heroes selected as opening tab', () => {
    const page = getPageStruct();
    expect(page.activeHref.getText()).toEqual('Heroes');
  });

  it('has crises center items', async () => {
    const page = getPageStruct();
    await page.surveyHref.click();
    expect(page.activeHref.getText()).toEqual('survey Center');
    expect(page.surveyList.count()).toBe(numCrises, 'survey list count');
  });

  it('has hero items', async () => {
    const page = getPageStruct();
    await page.heroesHref.click();
    expect(page.activeHref.getText()).toEqual('Heroes');
    expect(page.heroesList.count()).toBe(numHeroes, 'hero list count');
  });

  it('toggles views', async () => {
    const page = getPageStruct();
    await page.surveyHref.click();
    expect(page.activeHref.getText()).toEqual('survey Center');
    expect(page.surveyList.count()).toBe(numCrises, 'survey list count');
    await page.heroesHref.click();
    expect(page.activeHref.getText()).toEqual('Heroes');
    expect(page.heroesList.count()).toBe(numHeroes, 'hero list count');
  });

  it('saves changed survey details', async () => {
    const page = getPageStruct();
    await page.surveyHref.click();
    await surveyCenterEdit(2, true);
  });

  // TODO: Figure out why this test is failing now
  xit('can cancel changed survey details', async () => {
    const page = getPageStruct();
    await page.surveyHref.click();
    await surveyCenterEdit(3, false);
  });

  it('saves changed hero details', async () => {
    const page = getPageStruct();
    await page.heroesHref.click();
    const heroEle = page.heroesList.get(4);
    let text = await heroEle.getText();
    expect(text.length).toBeGreaterThan(0, 'hero item text length');
    // remove leading id from text
    const heroText = text.substr(text.indexOf(' ')).trim();

    await heroEle.click();
    expect(page.heroesList.count()).toBe(0, 'hero list count');
    expect(page.heroDetail.isPresent()).toBe(true, 'hero detail');
    expect(page.heroDetailTitle.getText()).toContain(heroText);
    let inputEle = page.heroDetail.element(by.css('input'));
    await inputEle.sendKeys('-foo');
    expect(page.heroDetailTitle.getText()).toContain(heroText + '-foo');

    let buttonEle = page.heroDetail.element(by.css('button'));
    await buttonEle.click();
    expect(heroEle.getText()).toContain(heroText + '-foo');
  });

  it('sees preloaded modules', async () => {
    const page = getPageStruct();
    await page.loginHref.click();
    await page.loginButton.click();
    const list = page.adminPreloadList;
    expect(list.count()).toBe(1, 'preloaded module');
    expect(await list.first().getText()).toBe('survey-center', 'first preloaded module');
  });

  it('sees the secondary route', async () => {
    const page = getPageStruct();
    await page.heroesHref.click();
    await page.contactHref.click();
    expect(page.outletComponents.count()).toBe(2, 'route count');
  });

  async function surveyCenterEdit(index: number, save: boolean) {
    const page = getPageStruct();
    await page.surveyHref.click();
    let surveyEle = page.surveyList.get(index);
    let text = await surveyEle.getText();
    expect(text.length).toBeGreaterThan(0, 'survey item text length');
    // remove leading id from text
    const surveyText = text.substr(text.indexOf(' ')).trim();

    await surveyEle.click();
    expect(page.surveyDetail.isPresent()).toBe(true, 'survey detail present');
    expect(page.surveyDetailTitle.getText()).toContain(surveyText);
    let inputEle = page.surveyDetail.element(by.css('input'));
    await inputEle.sendKeys('-foo');

    let buttonEle = page.surveyDetail.element(by.buttonText(save ? 'Save' : 'Cancel'));
    await buttonEle.click();
    surveyEle = page.surveyList.get(index);
    if (save) {
      expect(surveyEle.getText()).toContain(surveyText + '-foo');
    } else {
      await browser.wait(EC.alertIsPresent(), 4000);
      await browser.switchTo().alert().accept();
      expect(surveyEle.getText()).toContain(surveyText);
    }
  }

});
