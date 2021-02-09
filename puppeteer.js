const puppeteer = require('puppeteer');

const screenshot = 'github.png';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://github.com/login');
    await page.type('#login_field', 'username');
    await page.type('#password', 'password');
    await page.waitForNavigation();
    await page.screenshot({ path: screenshot });
    browser.close();
})();
