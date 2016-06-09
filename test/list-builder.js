var expect = require('expect');
var ChimpWrapper = require('../index');

describe('List builder', () => {
  var apiKey = "b935432cb953f72f4e9c3c5ae76537fd-us12";
  const MC = new ChimpWrapper(apiKey);
  var dummyListId;
  var sampleList = {
    name: 'MochaTest',
    contact: {
      company: 'MyTestingCompany',
      address1: 'My First Address',
      city: 'Maccheroni',
      state: 'The Moon',
      zip:'00000',
      country: 'Universe',
    },
    permission_reminder: 'Test',
    email_type_option: false,
    campaign_defaults: {
      from_name: 'Testing',
      from_email: 'abcd@gmail.com',
      subject:'Testing',
      language:'EN'
    }
  }

  before((done) => {
    MC.post('lists', sampleList).then((res) => {
      dummyListId = res.id;
      done();
    });
  });

  after((done) => {
    MC.delete(`/lists/${dummyListId}`).then(() => {
      done();
    });
  })

  it('should return all lists', (done) => {
    expect(MC.lists).toExist();
    MC.lists().then((res) => {
      expect(res).toExist();
      done();
    });
  });

  it('should return single lists', (done) => {
    MC.list(dummyListId).then((res) => {
      expect(res).toExist();
      expect(res).toBeA('object');
      expect(res.id).toEqual(dummyListId);
      done();
    });
  });

})
