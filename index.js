var axios = require('axios');

function ChimpWrapper (apiKey){
  this.__apiKey = apiKey || null;
  this.__apiUrl = 'https://' + this.__apiKey.split('-')[1] + '.api.mailchimp.com/3.0/'

  this.http = axios.create({
    baseURL: this.__apiUrl,
    headers: {
      Authorization: 'apiKey ' + apiKey
    }
  });
}

ChimpWrapper.prototype.parseUrl = url => url[0] === '/' ? url : `/${url}`;


ChimpWrapper = require('./modules/raw-calls')(ChimpWrapper);
ChimpWrapper = require('./modules/lists')(ChimpWrapper);

module.exports = exports = ChimpWrapper;
