module.exports = function (ChimpWrapper) {

  return {
    get: (url) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.get(url).then((res) => {
        return res.data;
      });
    },
    post: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.post(url, body).then((res) => {
        return res.data;
      });
    },
    patch: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.patch(url, body).then((res) => {
        return res.data;
      });
    },
    put: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.put(url, body).then((res) => {
        return res.data;
      });
    },
    delete: (url) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.delete(url);
    },
  };
}
