var expect = require('expect');
var ChimpWrapper = require('../index');

require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );


describe('Creating Istance', () => {
  it('should generate right api URL from apiKey', () => {
    expect(MC.__apiUrl).toBeA('string');
    expect(MC.__apiUrl).toBe('https://us12.api.mailchimp.com/3.0/');
  });

  it('should create axios istance with default data', () => {
    expect(MC.http).toExist();
    expect(MC.http.defaults).toBeA('object');
    expect(MC.http.defaults.baseURL).toEqual('https://us12.api.mailchimp.com/3.0/');
    expect(MC.http.defaults.headers).toExist();
    expect(MC.http.defaults.headers.Authorization).toExist();
    expect(MC.http.defaults.headers.Authorization).toBeA('string');
    expect(MC.http.defaults.headers.Authorization).toEqual('apiKey ' + process.env.API_KEY);
  });

  describe('proto helper methods', () => {
    it('should parse trail slash url', () => {
      expect( MC.parseUrl('list')[0] ).toBe('/');
      expect( MC.parseUrl('/list')[0] ).toBe('/');
    })
  })

})
