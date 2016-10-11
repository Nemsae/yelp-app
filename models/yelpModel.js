const fs = require('fs');
const path = require('path');
const Yelp = require('yelp');
const uuid = require('uuid');

const filename = path.join(__dirname, '../data/favorites.json');
const filename1 = path.join(__dirname, '../data/searches.json');
const filename2 = path.join(__dirname, '../data/businesses.json');

const yelp = new Yelp({
  consumer_key: 'eptqS1riLCY_wwV63dnKQQ',
  consumer_secret: 'XVxSsYBd-CgN35ttvtXx2Rcc8pA',
  token: '1mtugtim8gMW3M5GIk7zqOlzXl-AMz4t',
  token_secret: 'p8gIOUiGCpdFWEeV1NCDi6oc5ac'
});

exports.write = function (newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename, json, cb);
};

exports.write1 = function (newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename1, json, cb);
};

exports.write2 = function (newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename2, json, cb);
};

exports.getAll = function (cb) {
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch (e) {
      data = [];
    }
    cb(null, data);
  });
};

exports.writeSearchResults = function (query, cb) {
  console.log('query in yelpModel1: ', query);
  query.limit = 20;
  console.log('query in yelpModel2: ', query);

  yelp.search(query, (err, data) => {
    if (err) return cb(err);
    console.log('data: ', data);

    exports.write1(data, cb);
    cb(null, data);
  });
};

exports.getBusinessResult = function (id, cb) {
  yelp.business(id, cb, (err, data) => {
    if (err) {
      return console.log(err);
    }

    exports.write2(data, cb);
    cb(null, data);
  });
};

exports.postFavoriteBusiness = function (body, cb) {
  console.log('body in Model: ', body);

  exports.getAll((err, items) => {
    if (err) return cb(err);
    console.log("body.id", body.id);
    items = items.filter((cur) => {
      if (cur.id !== body.id) {
        return cur;
      }
    });
    items.push(body);
    exports.write(items, cb);
    cb(null, items);
  });
};

exports.getFavorites = function (cb) {
  console.log('sanity');
  exports.getAll((err, items) => {
    console.log('sanity');
    if (err) return cb(err);
    cb(null, items);
  });
};

exports.removeFavorite = function (id, cb) {
  console.log('id omega: ', id);
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    console.log('id of model: ', id);
    let favorites = JSON.parse(buffer);
    let undeletedFavorites = favorites.filter((card) => {
      if (card.id === id) {
        return;
      } else {
        return card;
      }
    });
    console.log('undeletedFavorites: ', undeletedFavorites);
    exports.write(undeletedFavorites, cb);
    cb(null, undeletedFavorites);
  });

};
