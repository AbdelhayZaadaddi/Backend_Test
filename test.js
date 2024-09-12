const axios = require('axios');
const cheerio = require('cheerio');

async function crawlWebsite(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const textContent = $('body').text();  // or specific content extraction
  return textContent;
}

crawlWebsite('https://en.wikipedia.org/wiki/John_Rolph').then(console.log);