module.exports = function (ChimpWrapper) {
  /**
   * RAW METHODS CALLS (RETURN PROMISE)
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

  return ChimpWrapper;
}
