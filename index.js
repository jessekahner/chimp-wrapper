var axios = require('axios');

function ChimpWrapper (apiKey){
  var that = this;
  this.__apiKey = apiKey || null;
  this.__apiUrl = 'https://' + this.__apiKey.split('-')[1] + '.api.mailchimp.com/3.0/'

  this.http = axios.create({
    baseURL: this.__apiUrl,
    headers: {
      Authorization: 'apiKey ' + apiKey
    }
  });

  this.parseUrl = url => url[0] === '/' ? url : `/${url}`;

  this.config = that;
  this.get    = require('./modules/raw-calls')(that).get;
  this.post   = require('./modules/raw-calls')(that).post;
  this.patch  = require('./modules/raw-calls')(that).patch;
  this.put    = require('./modules/raw-calls')(that).put;
  this.delete = require('./modules/raw-calls')(that).delete;

  this.lists  = require('./modules/lists')(that);

  return this;

}

module.exports = exports = ChimpWrapper;
