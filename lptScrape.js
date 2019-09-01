const puppeteer = require('puppeteer');
const chalk = require("chalk");
var fs = require("fs");
const path = require('path');
const jimp = require('jimp')
var text2png = require('text2png');

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.reddit.com/r/LifeProTips/`);

    var lptHeading = await page.evaluate(() => {

var number = Math.floor((Math.random() * 10) + 1);

      var fHeader = document.querySelectorAll('div a h3')[number].innerText;

      return fHeader;
    });

    await browser.close();

    fs.writeFile("lptHeader.json", JSON.stringify(lptHeading), function(err) {
      if (err) throw err;
      console.log("Saved!");
      console.log(lptHeading);
    });

var newString = '';

  var lptSplit = lptHeading.split(" ");
  console.log(lptSplit);
for(i=0;i<lptSplit.length;i+=3)
{
  if(typeof lptSplit[i+1] ==='undefined'){
  lptSplit[i+1] = '';
  lptSplit[i+2] = '';
}
if(typeof lptSplit[i+2] ==='undefined'){
    lptSplit[i+2] = '';
}
var newString = newString + (lptSplit[i] + ' ' + lptSplit[i+1] + ' ' + lptSplit[i+2]) + '\n';
}
console.log(newString);

    fs.writeFileSync('out.png', text2png(
      newString,
    {
      color: 'red',
      backgroundColor : 'white',
      padding: 200,
    }

    ));

    console.log(success("Browser Closed"));

  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
} ) ();
