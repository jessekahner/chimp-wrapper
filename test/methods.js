var expect = require('expect');
var ChimpWrapper = require('../index');

describe('Methods', () => {
  var apiKey = "b935432cb953f72f4e9c3c5ae76537fd-us12";
  const MC = new ChimpWrapper(apiKey);

  describe('GET method', () => {

    it('should return data from GET method', (done) => {
      MC.get('lists').then((res) => {
        expect(res).toExist();
        done();
      }).catch((e) => {
        done(e);
      })
    });
    /// ...
  });

})
