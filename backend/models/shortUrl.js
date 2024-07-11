const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true,
    default: shortId.generate
  },
  url_clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);