module.exports = function (ChimpWrapper) {

  return {
    get: (url) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.get(url).then((res) => {
        response = res.data === '' ? res : res.data;
        return response;
      });
    },
    post: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.post(url, body).then((res) => {
        response = res.data === '' ? res : res.data;
        return response;
      });
    },
    patch: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.patch(url, body).then((res) => {
        response = res.data === '' ? res : res.data;
        return response;
      });
    },
    put: (url, body) => {
      url = ChimpWrapper.parseUrl(url);
      return ChimpWrapper.http.put(url, body).then((res) => {
        response = res.data === '' ? res : res.data;
        return response;
      });
    },
    delete: (url) => {
      url = ChimpWrapper.parseUrl(url);
      //console.log('calling', url);
      return ChimpWrapper.http.delete(url);
    },
  };
}
