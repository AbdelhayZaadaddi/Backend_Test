const express = require('express');
const Article = require('../models/Article');
const authMiddleware = require('../middlewares/authMiddleware');
const crawlWebsite = require('../utils/crawling');


const router = express.Router();


router.post('/articles', authMiddleware, async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).send(article);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/articles', authMiddleware, async (req, res) => {
    try {
        const articles = await Article.find({});
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/articles/:id', authMiddleware, async (req, res) => {
    try {
        const article = await Article.findOne({ id: req.params.id });
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete('/articles/:id', authMiddleware, async (req, res) => {
    try {
        const article = await Article.findOneAndDelete({ id: req.params.id });
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/analyze', async (req, res) => {
    try {
        const articles_content = await Article.find({});
        const paragraphs = {};

        articles_content.forEach(article => {
            const content = article.content;
            const contentParagraphs = content.split(/[\n,.?]+/);

            contentParagraphs.forEach(paragraph => {
                const normalizedParagraph = paragraph.trim().toLowerCase();
                
                if (normalizedParagraph) {
                    if (paragraphs[normalizedParagraph]) {
                        paragraphs[normalizedParagraph].count += 1;
                    } else {
                        paragraphs[normalizedParagraph] = { content: paragraph, count: 1 };
                    }
                }
            });
        });

        const duplicates = Object.values(paragraphs).filter(paragraph => paragraph.count > 1);

        res.status(200).send(duplicates);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/analyzee', async (req, res) => {
    try {
        const searchParagraph = req.query.paragraph;

        if (!searchParagraph) {
            return res.status(400).send('Please provide a paragraph to search for.');
        }

        const normalizedSearchParagraph = searchParagraph.trim().toLowerCase();

        const articles_content = await Article.find({});
        const matchingParagraphs = [];
        let paragraphCount = 0;

        articles_content.forEach(article => {
            const content = article.content;

            const contentParagraphs = content.split(/[\n,.?]+/);
            contentParagraphs.forEach(paragraph => {
                const normalizedParagraph = paragraph.trim().toLowerCase();

                if (normalizedParagraph === normalizedSearchParagraph) {
                    matchingParagraphs.push(paragraph);
                    paragraphCount++;
                }
            });
        });

        if (matchingParagraphs.length > 0) {
            res.status(200).send({ matches: matchingParagraphs, count: paragraphCount });
        } else {
            res.status(404).send('No matching paragraph found.');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/crawl-and-compare', authMiddleware, async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('Please provide a URL.');
    }

    try {
        // Crawl the website and get the paragraphs
        const crawledParagraphs = await crawlWebsite(url);

        // Fetch all articles from the database
        const storedArticles = await Article.find({});

        const duplicateParagraphs = [];

        // Iterate over crawled paragraphs and compare them with the stored articles
        crawledParagraphs.forEach(crawledParagraph => {
            const normalizedCrawledParagraph = crawledParagraph.trim().toLowerCase();

            storedArticles.forEach(article => {
                const contentParagraphs = article.content.split(/[\n,.?]+/);

                contentParagraphs.forEach(paragraph => {
                    const normalizedParagraph = paragraph.trim().toLowerCase();

                    if (normalizedParagraph === normalizedCrawledParagraph) {
                        duplicateParagraphs.push(paragraph);
                    }
                });
            });
        });

        if (duplicateParagraphs.length > 0) {
            res.status(200).send({ duplicates: true, paragraphs: duplicateParagraphs });
        } else {
            res.status(200).send({ duplicates: false });
        }
    } catch (error) {
        res.status(500).send('Error occurred while crawling or comparing.');
    }
});



module.exports = router;