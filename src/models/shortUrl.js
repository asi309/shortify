const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
