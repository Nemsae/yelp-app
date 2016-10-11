const PORT = 8000;

//  REQUIRES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const YelpModel = require('./models/yelpmodel.js');

 // APP DECLARATION
const app = express();

//  GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

//  WEBPACK CONFIGURATION
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

//  ______________________________ROUTES______________________________//
//  Yelp

//  GET search results than write
app.get('/yelp', (req, res) => {
  let query = req.query;
  console.log('query: ', query);

  YelpModel.writeSearchResults(query, (err, data) => {
    if (err) return res.status(400).send(err);
    res.send(data);
  });
});

//  GET favorites
app.get('/yelp/favorites', (req, res) => {
  YelpModel.getFavorites((err, favorites) => {
    if (err) return res.status(400).send(err);
    res.send(favorites);
  });
});

app.delete('/yelp/delete/:id', (req, res) => {
  let id = req.params.id;
  console.log('id LAST: ', id);
  YelpModel.removeFavorite(id, (err, undeletedFavorites) => {
    // console.log('req: ', req);
    // console.log('res: ', res);
    if (err) return res.status(400).send(err);
    res.send(undeletedFavorites);
  });
});

app.get('/yelp/:id', (req, res) => {
  let id = req.params.id;
  console.log('id: ', id);

  YelpModel.getBusinessResult(id, (err, business) => {
    if (err) return res.status(400).send(err);
    res.send(business);
  });
});

app.post('/yelp', (req, res) => {
  console.log('req.body in app.js: ', req.body);
  YelpModel.postFavoriteBusiness(req.body, (err, favorites) => {
    if (err) return res.status(400).send(err);
    res.send(favorites);
  });
});

app.use('*', function(request, response) {
	// send the index.html
  response.sendFile(path.join(__dirname, './build/index.html'));
});

//  SERVER LISTEN
app.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});
