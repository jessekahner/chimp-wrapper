var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const CW = new ChimpWrapper( process.env.API_KEY );

function ResError(errors){
  console.log(errors);
  return new Error(JSON.stringify(errors.data));
}

describe.only('Campigns builder', function() {
  var campaign_id;
  var campaign_option = {
    type: 'plaintext',
    settings: {
      subject_line: 'Test Subject',
      from_name: 'cosmopavone@gmail.com',
      reply_to: 'cosmopavone@gmail.com',
    }
  }

  // it('shoud throw err if no ID given', () => {
  //   expect(CW.lists.categories).toThrow(/(ID|body)/);
  //   expect(CW.lists.categories.create).toThrow(/(ID|body|category)/);
  //   expect(CW.lists.categories.edit).toThrow(/(ID|body|category)/);
  //   expect(CW.lists.categories.delete).toThrow(/(ID|body|category)/);
  // });

  it('should return all campaigns', (done) => {
    expect(CW.campaigns).toExist();
    CW.campaigns().then((res) => {
      expect(res).toExist();
      done();
    }).catch( err => done( ResError( err ) ) );
  });

  it('should create a campaign', (done) => {
    CW.campaigns.create(campaign_option).then((res) => {
      campaign_id = res.id;
      expect(res).toExist();
      expect(res.id).toBeA('string');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('should return a single campaign', (done) => {
    CW.campaigns(campaign_id).then((res) => {
      expect(res).toExist();
      expect(res.id).toBeA('string');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud edit the campaign', (done) => {
    CW.campaigns.edit(campaign_id, {
      settings: { subject_line: 'Changed Subject' }
    }).then((res) => {
      expect(res.id).toBe(campaign_id);
      expect(res.settings.subject_line).toBe('Changed Subject');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('should delete the campaign', (done) => {
    CW.campaigns.delete(campaign_id).then((res) => {
      expect(res).toExist();
      expect(res.status).toEqual(204);
      expect(res.statusText).toEqual('No Content');
      done();
    });
  });
}); //describe_main
