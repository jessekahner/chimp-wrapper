var axios = require('axios');

function ChimpWrapper (apiKey){
  this.__apiKey = apiKey || null;

  this.http = axios.create({
    baseURL: 'https://' + apiKey.split('-')[1] + '.api.mailchimp.com/3.0/',
    headers: {
      Authorization: 'apyKey ' + apiKey
    }
  });
}

/**
 * RETURN PROMISE
 */
ChimpWrapper.prototype.get = function(url) {
  url = url[0] === '/' ? url : `/${url}`;
  return this.http.get(url).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.post = function(url, body) {
  url = url[0] === '/' ? url : `/${url}`;
  return this.http.post(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.patch = function(url, body) {
  url = url[0] === '/' ? url : `/${url}`;
  return this.http.patch(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.put = function(url, body) {
  url = url[0] === '/' ? url : `/${url}`;
  return this.http.put(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.delete = function(url) {
  url = url[0] === '/' ? url : `/${url}`;
  return this.http.delete(url).then((res) => {
    return res.data;
  });
}

module.exports = exports = ChimpWrapper;
