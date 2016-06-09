var expect = require('expect');
var ChimpWrapper = require('../index');

describe('Creating Istance', () => {
  var apiKey = "b935432cb953f72f4e9c3c5ae76537fd-us12";
  const MC = new ChimpWrapper(apiKey);


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
    expect(MC.http.defaults.headers.Authorization).toEqual('apiKey ' + apiKey);
  });

  describe('proto helper methods', () => {
    it('should parse trail slash url', () => {
      expect( MC.parseUrl('list')[0] ).toBe('/');
      expect( MC.parseUrl('/list')[0] ).toBe('/');
    })
  })

})
