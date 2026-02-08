const express = require('express');
const fs = require('fs/promises');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { allTools, categories, getToolBySlug } = require('../config/tools');
const { summarizeIntoFiveBullets } = require('../services/summarizer');
const { safeDelete } = require('../utils/file');

const router = express.Router();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.get('/', (req, res) => {
  res.render('home', {
    categories,
    pageTitle: 'Free Document Utility Tools | No Login',
    pageDescription:
      'Free, no-login document tools for students, job seekers, and quick PDF fixes. Ad-supported and privacy-friendly.'
  });
});

router.get('/privacy-policy', (req, res) => {
  res.render('privacy', {
    pageTitle: 'Privacy Policy | Free Document Tools',
    pageDescription: 'Learn how files are handled and auto-deleted in our no-login document utility tools.'
  });
});

router.get('/tools/:slug', (req, res) => {
  const tool = getToolBySlug(req.params.slug);
  if (!tool) return res.status(404).render('404', { pageTitle: 'Tool not found' });

  res.render('tool', {
    tool,
    categories,
    pageTitle: tool.metaTitle || `${tool.title} Free | No Login`,
    pageDescription: tool.description,
    result: null,
    error: null
  });
});

router.post('/tools/:slug/process', upload.single('document'), async (req, res) => {
  const tool = getToolBySlug(req.params.slug);
  if (!tool) return res.status(404).render('404', { pageTitle: 'Tool not found' });

  const filePath = req.file?.path;

  try {
    if (!filePath) {
      throw new Error('Please upload a PDF file first.');
    }

    if (tool.slug !== 'summarize-pdf-5-bullets') {
      throw new Error('This tool template is ready. Processing logic will be added next.');
    }

    const buffer = await fs.readFile(filePath);
    const parsed = await pdfParse(buffer);
    const bullets = summarizeIntoFiveBullets(parsed.text || '');

    res.render('tool', {
      tool,
      categories,
      pageTitle: tool.metaTitle || `${tool.title} Free | No Login`,
      pageDescription: tool.description,
      result: {
        title: 'Your 5-point summary',
        items: bullets
      },
      error: null
    });
  } catch (error) {
    res.status(400).render('tool', {
      tool,
      categories,
      pageTitle: tool.metaTitle || `${tool.title} Free | No Login`,
      pageDescription: tool.description,
      result: null,
      error: error.message
    });
  } finally {
    await safeDelete(filePath);
  }
});

router.get('/sitemap.xml', (req, res) => {
  const urls = ['/', '/privacy-policy', ...allTools.map((t) => `/tools/${t.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `<url><loc>${req.protocol}://${req.get('host')}${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  res.type('application/xml').send(sitemap);
});

module.exports = router;
