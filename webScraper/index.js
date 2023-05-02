const PORT = 3000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//url of the site you want to scrape
async function cryptoPriceScraper() {
  const url = 'https://coinmarketcap.com/';
  const coinArray = [];

  try {
    const response = await axios(url);
    const html_data = response.data;
    const $ = cheerio.load(html_data);
//#__next > div > div.main-content > div.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr:nth-child(1)
    const selectedElem =
      '#__next > div > div.main-content > div.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr'      ;

    const keys = [
      'No.',
      'Coin',
      'Price',
      '24h',
      '7d',
      'Marketcap',
      'Volume',
      'CirculatingSupply',
    ];
    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 9) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
          console.log(coinDetails)
        coinArray.push(coinDetails);
      }
    });
  } catch (err) {
    console.log(err);
  }

  return coinArray;
}

app.get('/api/crypto', async (req, res) => {
  try {
    const crypto = await cryptoPriceScraper();
    return res.status(200).json({
      result: crypto,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});
