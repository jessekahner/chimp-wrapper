var expect = require('expect');
var ChimpWrapper = require('../index');

require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );

function ResError(errors){
  return new Error(JSON.stringify(errors.data));
}

describe('Methods', () => {

  describe('GET method', () => {
    it('should return data from GET method', (done) => {
      MC.get('lists').then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });
    /// ...
  });

})
