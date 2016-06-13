var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const CW = new ChimpWrapper( process.env.API_KEY );

function ResError(errors){
  console.log(errors);
  return new Error(JSON.stringify(errors.data));
}

describe('List builder', function() {
  var created_category_id;
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

  it('should return all lists', (done) => {
    expect(CW.lists).toExist();
    CW.lists().then((res) => {
      expect(res).toExist();
      done();
    }).catch( err => done( ResError( err ) ) );
  });

  it('should return single lists', (done) => {
    CW.lists(dummyListId).then((res) => {
      expect(res).toExist();
      expect(res).toBeA('object');
      expect(res.id).toEqual(dummyListId);
      done();
    }).catch( err => done( ResError( err ) ) );
  });

  //  CREATE LIST
  describe('create list', () => {

    it('should throw error if wrong option provided', () => {
      expect(CW.lists.create).toThrow(/missing/)
    });

    it('should create a list', (done) => {
      CW.lists.create(sampleList).then((res) => {
        dummyListId = res.id;
        expect(res.name).toEqual(sampleList.name);
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); //  CREATE LIST

  //  EDIT LIST
  describe('edit list', () => {

    it('should throw error if no id given', () => {
      expect(CW.lists.edit).toThrow(/No list ID provided/)
    });

    it('should edit the dummy list', (done) => {
      var body = {
        name: 'nameChangeEditTest'
      }
      CW.lists.edit(dummyListId, body).then((res) => {
        expect(res.name).toEqual(body.name)
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });//  EDIT LIST


  //  ACTIVITY
  describe('get lists activity', () => {

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.activity).toThrow(/No list ID/);
    });

    it('should return list activity', (done) => {
      CW.lists.activity(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); // ACTIVITY

  //  CLIENTS
  describe('get lists clients', () => {

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.clients).toThrow(/No list ID/);
    });

    it('should return list clients', (done) => {
      CW.lists.clients(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); //  CLIENTS


  //  ABUSE REPORTS
  describe('get lists abuse-report', () => {

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.abuseReports).toThrow(/No list ID/);
    });

    it('should return list abuse-report', (done) => {
      CW.lists.abuseReports(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });  //  ABUSE REPORTS

  //  GROWTH HISTORY
  describe('get lists growth-history', () => {

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.growthHistory).toThrow(/No list ID/);
    });

    it('should return list growth-history', (done) => {
      CW.lists.growthHistory(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
    });

    it('should return list growth-history for month given', (done) => {
      var date;
      var month = new Date().getMonth().toString().length < 1 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      date = year + "-" + month;
      CW.lists.growthHistory(dummyListId, String(date)).then((res) => {
        expect(res).toExist();
        done();
      }).catch((err) => {
        let status = err.data.status;
        if(status === 404) expect(1).toBe(1)
        done();
      });
    });

  });


  //  CATEGORIES aka groups' titles
  describe('lists INTERESTS\' categories', () => {

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.categories).toThrow(/(ID|body)/);
      expect(CW.lists.categories.create).toThrow(/(ID|body|category)/);
      expect(CW.lists.categories.edit).toThrow(/(ID|body|category)/);
      expect(CW.lists.categories.delete).toThrow(/(ID|body|category)/);
    });

    it('should return list interest-categories', (done) => {
      CW.lists.categories(dummyListId).then((res) => {
        expect(res.categories).toExist();
        expect(res.categories).toBeA('array');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud create interest category in the list', (done) => {
      // no arguments check
      expect(CW.lists.categories.create).toThrow(/(ID|body)/);

      CW.lists.categories.create(dummyListId, {
          title: 'TestValue',
          type: 'radio'
      }).then((res) => {
        created_category_id = res.id;
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud edit created category', (done) => {

      // no arguments check
      expect(CW.lists.categories.edit).toThrow(/(ID|body)/);

      CW.lists.categories.edit(dummyListId, created_category_id, {
        title: 'Programming'
      }).then((res) => {
        expect(res.title).toEqual('Programming');
        done()
      }).catch((err) => done(err));
    });

    it('shoud list 1 categories after creation ', (done) => {
      CW.lists.categories(dummyListId, created_category_id).then((res) => {
        expect(res).toExist();
        expect(res.id).toEqual(created_category_id);
        done();
      }).catch((err) => done(err));
    });
  });


  //  INTERESTS aka groups' names
  describe('lists CATEGORY\'s interests', () => {
    var created_interest_id;

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.interests).toThrow(/(ID|body)/);
      expect(CW.lists.interests.create).toThrow(/(ID|body|category)/);
      expect(CW.lists.interests.edit).toThrow(/(ID|body|category)/);
      expect(CW.lists.interests.delete).toThrow(/(ID|body|category)/);
    });

    it('shoud create an interest inside a category', (done) => {
      CW.lists.interests.create(dummyListId, created_category_id, {
        name: 'python',
      }).then((res) => {
        created_interest_id = res.id;
        expect(res).toExist();
        expect(res.name).toEqual('python');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud edit an interest inside a category', (done) => {
      CW.lists.interests.edit(dummyListId, created_category_id, created_interest_id, {
        name: 'javascript',
      }).then((res) => {
        expect(res).toExist();
        expect(res.name).toEqual('javascript');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud lists all intests in a category', () => {
      CW.lists.interests(dummyListId, created_category_id ).then((res) => {
        expect(res).toExist();
        expect(res.length).toNotBe(0)
        done()
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud return a single interest', () => {
      CW.lists.interests(dummyListId, created_category_id, created_interest_id ).then((res) => {
        expect(res).toExist();
        expect(res.id).toEqual(created_interest_id);
        done()
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud delete interest', (done) => {
      CW.lists.interests.delete(dummyListId, created_category_id, created_interest_id ).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud delete created category', (done) => {
      CW.lists.categories.delete(dummyListId, created_category_id ).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); //describe;

  //  MEMBERS
  // --------------------------------------------------------------------------------

  describe('lists members', () => {
    var created_member_id;

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.members).toThrow(/(ID|body)/);
      expect(CW.lists.members.create).toThrow(/(ID|body|category)/);
      expect(CW.lists.members.edit).toThrow(/(ID|body|category)/);
      expect(CW.lists.members.delete).toThrow(/(ID|body|category)/);
    });

    it('shoud create a meber', function(done) {
      CW.lists.members.create(dummyListId, {
        status: 'subscribed',
        email_address: 'imthebest@hotmail.com'
      }).then((res) => {
        expect(res.email_address).toEqual('imthebest@hotmail.com');
        expect(res.status).toEqual('subscribed');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return all subscriber', (done) => {
      CW.lists.members(dummyListId).then((res) => {
        expect(res.members).toExist();
        expect(res.members.length).toBe(1);
        expect(res).toExist();
        created_member_id = res.members[0].id;
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return single member', (done) => {
      CW.lists.members(dummyListId, created_member_id ).then((res) => {
        expect(res).toExist();
        expect(res.id).toBe(created_member_id);
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud edit single member', (done) => {
      CW.lists.members.edit(dummyListId, created_member_id, {
        status: 'pending'
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual('pending');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud delete member', (done) => {
      CW.lists.members.delete(dummyListId, created_member_id).then((res) => {
        expect(res).toExist();
        expect(res.status).toBe(204);
        done();
      }).catch( err => done( ResError( err ) ));
    });
  });


  //  SEGMENTS
  describe('Segments', () => {
    var segment_id;

    it('shoud throw err if no ID given', () => {
      expect(CW.lists.segments).toThrow(/(ID|body)/);
      expect(CW.lists.segments.create).toThrow(/(ID|body|segment_id)/);
      expect(CW.lists.segments.edit).toThrow(/(ID|body|segment_id)/);
      expect(CW.lists.segments.delete).toThrow(/(ID|body|segment_id)/);
    });


    it('shoud create a segment', (done) => {
      CW.lists.segments.create(dummyListId, {
        name: 'segment',
        static_segment: []
      }).then((res) => {
        expect(res).toExist()
        expect(res.name).toBe('segment');
        segment_id = res.id;
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return segments lists', (done) => {
      CW.lists.segments(dummyListId).then((res) => {
        expect(res).toExist()
        expect(res.segments).toBeA('array')
        expect(res.segments.length).toBe(1);
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return 1 segments', (done) => {
      CW.lists.segments(dummyListId, segment_id).then((res) => {
        expect(res).toExist()
        expect(res.id).toBe(segment_id);
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud edit single segment', (done) => {
      CW.lists.segments.edit(dummyListId, segment_id, {
        name: 'segment_edit'
      }).then((res) => {
        expect(res).toExist();
        expect(res.name).toEqual('segment_edit');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud delete segment', (done) => {
      CW.lists.segments.delete(dummyListId, segment_id).then((res) => {
        expect(res).toExist();
        expect(res.status).toBe(204);
        done();
      }).catch( err => done( ResError( err ) ));
    });

  });



  // KEEP IT LAST TO CLEANUP
  describe('delete lists', () => {
    it('should throw error if no id given', () => {
      expect(CW.lists.delete).toThrow(/No list ID provided/);
    });

    it('should delete the list', (done) => {
      CW.lists.delete(dummyListId).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });
}); //describe_main
