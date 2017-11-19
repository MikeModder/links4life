let router = require('express').Router();
let shortid = require('shortid');
let validURL = require('valid-url');
let multer = require('multer')();

router.post('/newurl', multer.array(), function(req, res){
  //validURL.isUri(urlVar)
  let longUrl = req.body.longurl;
  let urlDB = req.app.locals.urlDB;
  if(!longUrl){
    res.render('error', {msg: 'URL field can not be empty!'});
    return;
  }
  if(!validURL.isUri(longUrl)){
    res.render('error', {msg: 'You must provide a valid URL!'});
    return;
  }
  let = shortUrl = shortid.generate();
  if(urlDB.has(shortUrl)){
    console.error(`[ERROR] Duplicate ID: ${shortUrl}`);
    res.render('error', {msg: 'The dev is too lazy to handle duplicates! Please try again!'});
  }
  let newEntry = {
    longurl: longUrl,
    createdAt: Date.now()

  }
  urlDB.set(shortUrl, newEntry);
  console.log(`[INFO] Created new shortcode: ${shortUrl} for URL: ${longUrl}`);
  res.send(`<a href="http://${req.app.locals.domain+'l'+shortUrl}">Your shortlink.</a>`);

});

module.exports = router;
