var expect = require('expect');
var ChimpWrapper = require('../index');

require('dot-env')
const CW = new ChimpWrapper( process.env.API_KEY );

describe('Creating Istance', () => {
  it('should generate right api URL from apiKey', () => {
    expect(CW.config.__apiUrl).toBeA('string');
    expect(CW.config.__apiUrl).toBe('https://us12.api.mailchimp.com/3.0/');
  });

  it('should create axios istance with default data', () => {
    expect(CW.config.http).toExist();
    expect(CW.config.http.defaults).toBeA('object');
    expect(CW.config.http.defaults.baseURL).toEqual('https://us12.api.mailchimp.com/3.0/');
    expect(CW.config.http.defaults.headers).toExist();
    expect(CW.config.http.defaults.headers.Authorization).toExist();
    expect(CW.config.http.defaults.headers.Authorization).toBeA('string');
    expect(CW.config.http.defaults.headers.Authorization).toEqual('apiKey ' + process.env.API_KEY);
  });

  describe('proto helper methods', () => {
    it('should parse trail slash url', () => {
      expect( CW.config.parseUrl('list')[0] ).toBe('/');
      expect( CW.config.parseUrl('/list')[0] ).toBe('/');
    })
  })

})
