let router = require('express').Router();

router.get('/', function(req, res){
  console.log('[INFO] GET for home.');
  res.render('index');
});

router.get('/l', function(req, res){
  res.redirect(req.app.locals.domain+'/new');
});

router.get('/l:id', function(req, res){
  let id = req.params.id;
  let urlDB = req.app.locals.urlDB;
  if(!urlDB.has(id)){
    res.render('error', {msg: 'That short code wasn\'t found in the databse!'});
    return;
  }
  //res.send(id);
  let redirectUrl = urlDB.get(id).longurl;
  res.redirect(redirectUrl);
});

router.get('/new', function(req, res){
  res.render('newlink');
});

module.exports = router;
