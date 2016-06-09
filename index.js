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

/**
 * RETURN PROMISE
 */
ChimpWrapper.prototype.get = function(url) {
  url = this.parseUrl(url);
  return this.http.get(url).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.post = function(url, body) {
  url = this.parseUrl(url);
  return this.http.post(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.patch = function(url, body) {
  url = this.parseUrl(url);
  return this.http.patch(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.put = function(url, body) {
  url = this.parseUrl(url);
  return this.http.put(url, body).then((res) => {
    return res.data;
  });
}

ChimpWrapper.prototype.delete = function(url) {
  url = this.parseUrl(url);
  return this.http.delete(url);
}

// LISTS
ChimpWrapper.prototype.lists = function(id) {
  if(!id){
    return this.http.get('/lists').then((res) => {
      return res.data;
    });
  } else {
    return this.http.get('/lists/' + id).then((res) => {
      return res.data;
    });
  }
}

ChimpWrapper.prototype.listsCreate = function(body){
  // CHECKS
  if(body){
    return this.post('lists', body);
  }else{
    throw new Error('Body missing');
  }
}

ChimpWrapper.prototype.listsEdit = function(id, body){
   if(!id) throw new Error('No list ID provided!');
   return this.patch('lists/' + id, body);
}

ChimpWrapper.prototype.listsDelete = function(id){
   if(!id) throw new Error('No list ID provided!');
   return this.delete('lists/' + id);
}



module.exports = exports = ChimpWrapper;
