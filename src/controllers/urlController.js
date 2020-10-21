const shortId = require('shortid');
const shortUrl = require('../models/shortUrl');

const ShortUrl = require('../models/shortUrl');

module.exports = {
  async createShortUrl(req, res) {
    try {
      const { longUrl } = req.body;
      if (!longUrl) {
        return res.status(400).json({
          message: 'Required field missing',
        });
      }
      const existing_url = await ShortUrl.findOne({ longUrl: longUrl });
      if (!existing_url) {
        const shortUrl = await ShortUrl.create({
          shortUrl: shortId.generate(),
          longUrl,
        });
        return res.status(200).json({
          shortUrl: shortUrl.shortUrl,
        });
      }
      return res.status(200).json({
        shortUrl: existing_url.shortUrl,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async shortUrlRedirect(req, res) {
    try {
      const { shortUrl } = req.params;

      const existing_url = await ShortUrl.findOne({ shortUrl });
      if (!existing_url) {
        return res.status(404).json({ message: 'Page not found' });
      }
      existing_url.visits += 1;
      await existing_url.save();
      return res.redirect(existing_url.longUrl);
    } catch (error) {
      console.log(error);
    }
  },
};
