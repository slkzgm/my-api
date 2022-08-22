const puppeteer = require('puppeteer-extra');
const {isNumber} = require("util");
const stealth = require('puppeteer-extra-plugin-stealth')();

const checkForNumber = (cloneNumber) => isNumber(cloneNumber) && cloneNumber > 0 && cloneNumber < 20011
const format = (number) => {
  const formatted = number.toString();
  if (formatted.length === 1)
    return '0000' + formatted;
  if (formatted.length === 2)
    return '000' + formatted;
  if (formatted.length === 3)
    return '00' + formatted;
  if (formatted.length === 4)
    return '0' + formatted;
  if (formatted.length === 5)
    return formatted
}

const getSandboxAsset = async (cloneNumber) => {
  if (!checkForNumber(cloneNumber))
    return 'WRONG CLONE NUMBER';
  cloneNumber = format(cloneNumber);
  puppeteer.use(stealth);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.sandbox.game/en/avatars/CloneX/102/');
    await page.waitForNetworkIdle();
    await page.type('#avatar-search', `CloneX #${cloneNumber}`);
    await page.keyboard.press('Enter');
    await page.waitForNetworkIdle();

    return (await page.$eval('#basic > div.is-relative.page-container.page-main > div.marketplace.wrapper > div.container-cards > div.assets-wrapper > div > div.card-top > figure.image-preloader',
        e => e.getAttribute('style'))).split('"')[1];
  } catch (error) {
    console.log(error)
    await browser.close();
  } finally {
    await browser.close();
  }
};

module.exports = {
  getSandboxAsset
}
