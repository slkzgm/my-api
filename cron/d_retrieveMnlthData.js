const { performance } = require('perf_hooks');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const stealth = StealthPlugin();

const selectors = {
  box: {
    vialBoxDunk: '#Header\\ trait-filter-VIAL',
    equippedBox: '#EQUIPPED',
    dnaBoxVial: '#Header\\ trait-filter-DNA',
    dnaBoxDunk: '#Header\\ trait-filter-DNA',
    humanBox: '#HUMAN',
    robotBox: '#ROBOT',
    demonBox: '#DEMON',
    angelBox: '#ANGEL',
    reptileBox: '#REPTILE',
    undeadBox: '#UNDEAD',
    murakamiBox: '#MURAKAMI',
    alienBox: '#ALIEN'
  },
  buyNow: '#Buy_Now > div > span > input',
  firstItem: '#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1po1rbf-6.bUKivE > div.sc-1xf18x6-0.cPWSa-d.AssetSearchView--main > div.AssetSearchView--results.collection--results.AssetSearchView--results--phoenix > div.sc-1xf18x6-0.haVRLx.AssetsSearchView--assets > div.fresnel-container.fresnel-greaterThanOrEqual-sm > div > div > div:nth-child(1) > div > article > a > div.sc-1xf18x6-0.sc-dw611d-0.hocRfR.bhhGea',
  firstListingPrice: '#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1po1rbf-6.bUKivE > div.sc-1xf18x6-0.cPWSa-d.AssetSearchView--main > div.AssetSearchView--results.collection--results.AssetSearchView--results--phoenix > div.sc-1xf18x6-0.haVRLx.AssetsSearchView--assets > div.fresnel-container.fresnel-greaterThanOrEqual-sm > div > div > div:nth-child(1) > div > article > a > div.sc-1xf18x6-0.sc-dw611d-0.hocRfR.bhhGea > div.sc-1xf18x6-0.sc-1twd32i-0.sc-1wwz3hp-0.xGokL.kKpYwv.kuGBEl > div > div > div.sc-1a9c68u-0.jdhmum.Price--main.sc-1rzu7xl-0.eYVhXE > div.sc-7qr9y8-0.iUvoJs.Price--amount',
  floorPrice: '#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1xf18x6-0.haVRLx > div > div.fresnel-container.fresnel-greaterThanOrEqual-md > div > div:nth-child(6) > a > div > span.sc-1xf18x6-0.sc-1w94ul3-0.haVRLx.bjsuxj.styledPhoenixText > div',
  noItems: '#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1po1rbf-6.bUKivE > div.sc-1xf18x6-0.cPWSa-d.AssetSearchView--main > div.AssetSearchView--results.collection--results.AssetSearchView--results--phoenix > div.sc-ixw4tc-0.kyBdWA',
  supply: '#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1po1rbf-6.bUKivE > div.sc-1xf18x6-0.cPWSa-d.AssetSearchView--main > div.AssetSearchView--results.collection--results.AssetSearchView--results--phoenix > div.fresnel-container.fresnel-greaterThanOrEqual-md > div > p',
};
let skinVial = {
  floorPrice: 0,
  supply: 0,
  traits: {
    human: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    robot: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    demon: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    angel: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    reptile: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    undead: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    murakami: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    alien: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
  }
};
let timeout = 30000;
let errors = 0;

const testBypass1 = async (browser) => {
  const collectionSlug = 'skinvial-evox';
  const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE`;
  const page = await browser.newPage();
  try {
    await page.setExtraHTTPHeaders({'Accept-Language': 'en'});
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/78.0.3904.108 Chrome/78.0.3904.108 Safari/537.36');

    await page.goto(url);
    await page.waitForSelector(selectors.floorPrice, {timeout});
    console.log('1_UA_OK');
  } catch (err) {
    console.log('1_UA_ERROR');
  }
};
const testBypass2 = async (browser) => {
  const collectionSlug = 'skinvial-evox';
  const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE`;
  const page = await browser.newPage();
  try {
    await page.setExtraHTTPHeaders({'Accept-Language': 'en'});
    await page.goto(url, { waitUntil: 'networkidle0' });
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    await page.waitForSelector(selectors.floorPrice, {timeout});
    console.log('2_WUA_OK');
  } catch (err) {
    console.log('2_WUA_ERROR');
  }
};

const testBypass3 = async (browser) => {
  const url = 'https://bot.sannysoft.com/';
  const page = await browser.newPage();
  try {
    await page.setExtraHTTPHeaders({'Accept-Language': 'en'});
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');
    // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/78.0.3904.108 Chrome/78.0.3904.108 Safari/537.36');

    await page.goto(url);
    await page.screenshot({path: './botTest.png', fullPage: true});
    console.log('3_SANNYSOFT_OK');
  } catch (err) {
    console.log('3_SANNTSOFT_ERROR');
  }
};

const testBypass4 = async () => {
  try {
    const proxy = '127.0.0.1:24000';
    puppeteer.use(stealth);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [`--proxy-server=${proxy}`]
    });
    const page = await browser.newPage();

    await page.goto('https://monip.io/');
    const ip = await page.$eval('body > p:nth-child(3)', e => e.textContent);
    console.log(ip);
    console.log('PROXY OK');
  } catch (e) {
    console.log('PROXY ERROR');
  }
};

const testBypass5 = async () => {
  try {
    puppeteer.use(stealth);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();

    await page.goto('https://monip.io/');
    const ip = await page.$eval('body > p:nth-child(3)', e => e.textContent);
    console.log(ip);
    console.log('NO PROXY OK');
  } catch (e) {
    console.log('NO PROXY ERROR');
  }
};

const retrieveSupply = async (page) => {
  return await page.$eval(selectors.supply, e => parseInt(e.textContent
    .replace(" ", "")
    .replace(",", ""))
  );
};

const retrieveFirstListingPrice = async (page) => {
  return await page.$eval(selectors.firstListingPrice, e => parseFloat(e.textContent));
}

const toClick = async (page, selector) => {
  try {
    await page.click(selector);
    await page.waitForSelector(selectors.firstListingPrice, {timeout});
  } catch (e) {
    console.log(`First listing not found for ${selector} on ${page.url()} check for "no items"`);
    await page.waitForSelector(selectors.noItems, {timeout: 10000});
  }
}

const retrieveTraitsData = async (page, selector, data) => {
  try {
    await toClick(page, selector);
    data.supply = await retrieveSupply(page);
    await toClick(page, selectors.buyNow);
    data.supplyListed = await retrieveSupply(page);
    if (data.supplyListed > 0)
      data.floorPrice = await retrieveFirstListingPrice(page);
    else
      data.floorPrice = 0;
    await toClick(page, selector);
    await toClick(page, selectors.buyNow);
  } catch (err) {console.log(`selector: ${selector} not found.`)}
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const retrieveSkinVialData = async (browser) => {
  try {
    const collectionSlug = 'skinvial-evox';
    const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE`;
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({'Accept-Language': 'en'});
    await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');

    await page.goto(url);
    await page.waitForSelector(selectors.floorPrice, {timeout});
    skinVial.floorPrice = await page.$eval(selectors.floorPrice, e => parseFloat(e.textContent));
    skinVial.supply = await retrieveSupply(page);
    await toClick(page, selectors.box.dnaBoxVial);
    await retrieveTraitsData(page, selectors.box.humanBox, skinVial.traits.human);
    await retrieveTraitsData(page, selectors.box.robotBox, skinVial.traits.robot);
    await retrieveTraitsData(page, selectors.box.demonBox, skinVial.traits.demon);
    await retrieveTraitsData(page, selectors.box.angelBox, skinVial.traits.angel);
    await retrieveTraitsData(page, selectors.box.reptileBox, skinVial.traits.reptile);
    await retrieveTraitsData(page, selectors.box.undeadBox, skinVial.traits.undead);
    await retrieveTraitsData(page, selectors.box.murakamiBox, skinVial.traits.murakami);
    await retrieveTraitsData(page, selectors.box.alienBox, skinVial.traits.alien);
    page.close();
  } catch (err) {
    console.log(`Error while trying to access Skin Vials data: ${err}`);
    errors += 1;
  }
}

const retrieveData = async () => {
  const start = performance.now();
  // const proxy = '127.0.0.1:24000';
  // puppeteer.use(stealth);
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   defaultViewport: null,
  //   args: [`--proxy-server=${proxy}`]
  // });
  // await retrieveSkinVialData(browser);
  // await testBypass1(browser);
  // await testBypass2(browser);
  // await testBypass3(browser);
  await testBypass4();
  await testBypass5();

  // await browser.close();

  console.log(performance.now() - start);
  return ({
    skinVial,
    lastUpdate: Date.now(),
    lastSuccessfullUpdate: errors >= 1 ? data.lastSuccessfullUpdate : Date.now()
  });
}

(async () => {
  await retrieveData();
})();
