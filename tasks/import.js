'use strict';

try {
  require('dotenv').load();
} catch(e) {
  console.log('Reading variables from environment.\nIf in dev, use dotenv.');
}

if(!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_APP_ID){
  console.warn('Must have ALGOLIA_APP_ID and ALGOLIA_APP_ID env variables!');
  process.exit();
}

var _     = require('lodash');
var async = require('async');

var data        = require('../data.json');
var chunkedData = _.chunk(data, 10000);

var algoliasearch = require('algoliasearch');
var client        = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
var index         = client.initIndex('bestBuyProducts');

var finish = function(err){
  if(err){
    throw err;
  }

  console.log('Imported all products.');
};

index.setSettings({
  attributesToIndex: ['name', 'categories', 'brand', 'type', 'unordered(description)'],
  customRanking: ['desc(popularity)', 'asc(price)'],
  separatorsToIndex: '\'&', // (E.g. 4' Lightning Charge, AT&T)
  synonyms: [
    ['apple', 'mac'],
    ['hp', 'hewlett packard'],
    ['AT&T', 'ATT']
  ]
});

async.each(chunkedData, index.saveObjects.bind(index), finish);
