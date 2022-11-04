import puppeteer from 'puppeteer'

import { botWriteJson } from "./bot.writejson";
import { botWriteBdd } from './bot.writebdd'

export const launchTwitchBot = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
    // defaultViewport: { width: 600, height: 800 }
  });
  const page = await browser.newPage();
  await page.goto('https://www.twitch.tv/directory?sort=VIEWER_COUNT', { waitUntil: 'networkidle2', timeout: 0 });
  
  await page.click('button[data-a-target="consent-banner-accept"]')
  
  // await page.waitForTimeout(500)
  
  const url = await page.$$eval('a.ScCoreLink-sc-udwpw5-0.jswAtS.tw-link', (el: Element[]) => {
    return el.map((item: Element) => {
      return 'https://www.twitch.tv' + item.getAttribute('href') + '?sort=VIEWER_COUNT'
    })
  })
  
  const imgTrendTop = await page.$$eval('.ScAspectRatio-sc-1sw3lwy-1.kPofwJ.tw-aspect img', (el: Element[]) => {
    return el.map((item: Element) => {
      return item.getAttribute('src')
    })
  })
  
  let newUrl = url.filter((item: string, pos: number) => url.indexOf(item) === pos)
  
  const promises = newUrl.map(async (item: string) => {
    
    const newPage = await browser.newPage();
    
    await newPage.goto(item, { waitUntil: 'networkidle2', timeout: 0 });
    
    
    const fetchMultipleData = async (path: string) => {
      return await newPage.$$eval(path, (el: Element[]) => {
        return el.map((item: Element) => {
          return item?.textContent
        })
      })
    }
    
    const spec = await newPage.$$eval('div.Layout-sc-nxg1ff-0.pqFci.InjectLayout-sc-588ddc-0', (el: Element[]) => {
      return [el[0]?.textContent, el[1]?.textContent]
    })
    
    const name = await newPage.$$eval('h1.CoreText-sc-cpl358-0.ScTitleText-sc-1gsen4-0.kGpodG.gasGNr.tw-title', (el: Element[]) => {
      return el[0]?.textContent
    })
    
    const img = await newPage.$$eval('.tw-image:not(.InjectLayout-sc-588ddc-0.iDjrEF.tw-image.tw-image-avatar)', (el: Element[]) => {
      return el.map((item) => {
        return [item?.getAttribute('src')]
      })
    })
    
    const tag = await fetchMultipleData('div.InjectLayout-sc-588ddc-0.jNvUhD div.ScTagContent-sc-xzp4i-1.gONNWj')
    const nameTop = await fetchMultipleData('h3.CoreText-sc-cpl358-0.hjONlz')
    const specTop = await fetchMultipleData('div.ScMediaCardStatWrapper-sc-1ncw7wk-0.jluyAA.tw-media-card-stat')
    const nameStreamTop = await fetchMultipleData('p.CoreText-sc-cpl358-0.eyuUlK')
    
    const urlTopLive = await newPage.$$eval("p.CoreText-sc-cpl358-0.eyuUlK", (el: Element[]) => {
      return el.map((item: Element) => {
        return "https://www.twitch.tv/" + item.textContent?.toLowerCase();
      })
    })
    
    const regexView = /(\s|\b| )spectateurs/g
    
    const newSpecTop = specTop?.slice(1, 5)?.join(',')?.replaceAll(regexView, '')?.replaceAll(' ', '')
    const newNameTop = nameTop?.slice(1, 5)?.join('\n')
    const newUrlTopLive = urlTopLive?.slice(1, 5)?.join(',')
    const newNameStreamTop = nameStreamTop?.slice(1, 5)?.join(',')
    const newTag = tag?.join(',')
    
    // await newPage.waitForTimeout(2000)
    await newPage.close()
    
    return [spec, name, newTag, newSpecTop, newNameTop, img.slice(2, 6).join(','), imgTrendTop, newUrlTopLive, newNameStreamTop]
  })
  const result = await Promise.all(promises)
  const json = await botWriteJson(result)
  
  await botWriteBdd(json)
  
  // await page.waitForTimeout(1000);
  
  await browser.close()
};