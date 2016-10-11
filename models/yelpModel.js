const fs = require('fs');
const path = require('path');
const Yelp = require('yelp');

const filename1 = path.join(__dirname, '../data/searches.json');
const filename2 = path.join(__dirname, '../data/businesses.json');

const yelp = new Yelp({
  consumer_key: 'eptqS1riLCY_wwV63dnKQQ',
  consumer_secret: 'XVxSsYBd-CgN35ttvtXx2Rcc8pA',
  token: '1mtugtim8gMW3M5GIk7zqOlzXl-AMz4t',
  token_secret: 'p8gIOUiGCpdFWEeV1NCDi6oc5ac'
});

exports.write1 = function (newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename1, json, cb);
};

exports.write2 = function (newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename2, json, cb);
};

exports.writeSearchResults = function (query, cb) {
  yelp.search(query, (err, data) => {
    if (err) return cb(err);
    console.log('data: ', data);

    exports.write1(data, cb);
    // let json = JSON.stringify(data);
    // fs.writeFile(filename, json, cb);
    cb(null, data);
  });
};

exports.getBusinessResult = function (id, cb) {
  // id: yelp-san-francisco
  // console.log('id: ', id);
  yelp.business(id, cb, (err, data) => {
    if (err) return console.log(err);
    console.log(data);

    exports.write2(data, cb);
    cb(null, data);
  });
};
