const express = require('express');

const urlController = require('./controllers/urlController');

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'Server running' })
);

router.get('/:shortUrl', urlController.shortUrlRedirect);

router.post('/shorten', urlController.createShortUrl);

module.exports = router;
