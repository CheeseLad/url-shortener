const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost/url-shortener', {

});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    return res.render('index', { shortUrls: shortUrls });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/get-shortened-urls', async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    return res.json(shortUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/shorten-url', async (req, res) => {

  try {
    console.log(req.body.url);
    await ShortUrl.create({ full_url: req.body.url });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short_url: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.url_clicks++;
  shortUrl.save();

  return res.redirect(shortUrl.full_url);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on port 3001');
});