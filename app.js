/* Require in everything we need, and set them up */
const express = require('express');
const bodyParser = require('body-parser');
const enmap = require('enmap');
const enmapLevel = require('enmap-level');
const app = express();

app.locals.urlDB = new enmap({provider: new enmapLevel({name: 'shorturl'})});
app.locals.domain = '127.0.0.1:8080/';

app.locals.urlDB.defer.then(() => {
  console.log(`[URLDB] Loaded ${app.locals.urlDB.size} URLs!`);
});

/* Tell Express about our Middleware(z) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(validator());

/* Pull in our route files and tell Express to use them*/
let index = require('./routes/index');
let api = require('./routes/api');
app.use('/', index);
app.use('/api', api);

/* Use ejs for our view engine. */
app.set('view engine', 'ejs');

/* Tell Express to start listening on port 8080, and catch any errors */
app.listen(8080, function(err){
  if(err) throw err;
  console.log('[INFO] App listening on port 8080.');
});
