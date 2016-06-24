var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const CW = new ChimpWrapper( process.env.API_KEY );

function ResError(errors){
  console.log("ERROR", errors);
  return new Error(JSON.stringify(errors.data));
}

describe.only('Campigns builder', function() {
  var campaign_id, replicated_id, feedback_id;
  var campaign_option = {
    type: 'plaintext',
    recipients:{
      list_id: process.env.LIST_ID,
    },
    settings: {
      subject_line: 'Test Subject',
      from_name: 'cosmopavone',
      reply_to: process.env.TEST_MAIL,
    }
  }

  it('shoud throw err if no ID given', () => {
    expect(CW.campaigns.create).toThrow(/(ID|body|category)/);
    expect(CW.campaigns.edit).toThrow(/(ID|body|category)/);
    expect(CW.campaigns.delete).toThrow(/(ID|body|category)/);
  });

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


  it('shoud get campaign content', (done) => {
    CW.campaigns.content(campaign_id).then((res) => {
      expect(res).toExist();
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud change campaign content', (done) => {
    CW.campaigns.content(campaign_id, {
      plain_text: 'Test content',
    }).then((res) => {
      expect(res).toExist();
      expect(res.plain_text).toMatch(/Test content/);
      done();
    }).catch( err => done( ResError(err) ) );4
  });


  it('should send checklist', (done) => {
    CW.campaigns.checkList(campaign_id).then((res) => {
      expect(res).toExist();
      expect(res.is_ready).toBe(true);
      var checks = res.items;
      for(var i=0; i < checks.length; i++){
        expect(checks[i].type).toMatch(/(success|warning)/);
      }
      done();
    }).catch( err => done( ResError(err) ) );
  });

  // HAS A DAYLI CAP
  // it('shoud send test email', (done) => {
  //   CW.campaigns.test(campaign_id, {
  //     test_emails: [ process.env.TEST_MAIL ],
  //     send_type: 'plaintext'
  //   }).then((res) => {
  //     expect(res.status).toMatch(/(204|406)/);
  //     done();
  //   }).catch( err => done( ResError(err) ) );
  // });

  it('shoud send campaign', (done) => {
    CW.campaigns.send(campaign_id).then((res) => {
      expect(res.status).toBe(204);
      expect(res).toExist();
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud replicate campaign', (done) => {
    CW.campaigns.replicate(campaign_id).then((res) => {
      replicated_id = res.id;
      expect(res.status).toBe('save');
      expect(res).toExist();
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud schedule campaign', (done) => {
    CW.campaigns.schedule(replicated_id, {
      time:{
        year: 2017,
        month: 10,
        day:21,
        hour: 10,
        minute: 15,
        timezone:2
      }
    }).then((res) => {
      expect(res.status).toBe(204);
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud unschedule campaign', (done) => {
    CW.campaigns.unschedule(replicated_id).then((res) => {
      expect(String(res.status)).toMatch(/(204|406)/);
      done();
    }).catch( err => done( ResError(err) ) );
  });

  // FEEDBACKS
  // ----------------------------------------------
  it('shoud return feedbacks', (done) => {
    CW.campaigns.feedback(campaign_id).then((res) => {
      expect(res).toExist();
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud create a feedback', (done) => {
    CW.campaigns.feedback.create(campaign_id, {
      message: 'TEST FEEEDBACK',
    }).then((res) => {
      feedback_id = res.feedback_id;
      expect(res).toExist();
      expect(res.message).toBe('TEST FEEEDBACK');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud return single feedback', (done) => {
    CW.campaigns.feedback(campaign_id, feedback_id).then((res) => {
      expect(res).toExist();
      expect(res.message).toBe('TEST FEEEDBACK');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud edit single feedback', (done) => {
    CW.campaigns.feedback.edit(campaign_id, feedback_id, {
      message: 'TEST EDIT FEEDBACK'
    }).then((res) => {
      expect(res).toExist();
      expect(res.message).toBe('TEST EDIT FEEDBACK');
      done();
    }).catch( err => done( ResError(err) ) );
  });

  it('shoud delete single feedback', (done) => {
    CW.campaigns.feedback.delete(campaign_id, feedback_id).then((res) => {
      expect(res).toExist();
      expect(res.status).toBe(204);
      done();
    }).catch( err => done( ResError(err) ) );
  });



  // CLEANUP
  // ----------------------------------------------
  it('should delete the campaign', (done) => {
    CW.campaigns.delete(campaign_id).then((res) => {
      expect(res).toExist();
      expect(res.status).toEqual(204);
      expect(res.statusText).toEqual('No Content');
      done();
    }).catch( err => done( ResError(err) ) );
  });
  it('shoud delete the replicated campaign', (done) => {
    CW.campaigns.delete(replicated_id).then((res) => {
      expect(res).toExist();
      expect(res.status).toEqual(204);
      expect(res.statusText).toEqual('No Content');
      done();
    }).catch( err => done( ResError(err) ) );
  });
}); //describe_main
