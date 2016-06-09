var expect = require('expect');
var ChimpWrapper = require('../index');

require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );

describe('Methods', () => {

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
