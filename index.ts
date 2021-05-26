import webdriver from 'selenium-webdriver';
import chrome  from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import axios from 'axios';
import _ from 'lodash';

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const sleep = (ms:number) => new Promise(res => setTimeout(res, ms));

async function getArgs():Promise<any> {
    const r = await axios.get(`https://www.tactagara.com/files/argsTwitch.json`);
    return r.data;
}

async function main() {
    const { url, refreshTime } = await getArgs();

    while(true) {
        let opts = new chrome.Options();
        opts.addArguments('--headless');
        opts.addArguments('--disable-gpu');
        opts.addArguments("--no-sandbox");
        opts.addArguments("--start-maximized");
        opts.addArguments("--disable-infobars");
        opts.addArguments("--disable-extensions");
        let driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(opts)
            .build();

        await driver.get(url);
        console.log(new Date());
        console.log("page loaded");
        await sleep(refreshTime * 1000);
        driver.close();
    }
}

main();