const axios = require('axios');
const cheerio = require('cheerio');

async function crawlWebsite(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const textContent = $('body').text();

        const paragraphs = textContent.split(/[\n,.?]+/).map(paragraph => paragraph.trim()).filter(Boolean);

        return paragraphs;
    } catch (error) {
        console.error(`Error crawling website: ${error}`);
        throw new Error('Error crawling website');
    }
}

module.exports = crawlWebsite;
