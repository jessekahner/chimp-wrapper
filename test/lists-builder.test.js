var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );

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
    expect(MC.lists).toExist();
    MC.lists().then((res) => {
      expect(res).toExist();
      done();
    }).catch( err => done( ResError( err ) ) );
  });

  it('should return single lists', (done) => {
    MC.lists(dummyListId).then((res) => {
      expect(res).toExist();
      expect(res).toBeA('object');
      expect(res.id).toEqual(dummyListId);
      done();
    }).catch( err => done( ResError( err ) ) );
  });

  //  CREATE LIST
  describe('create list', () => {

    it('should throw error if wrong option provided', () => {
      expect(MC.listsCreate).toThrow(/missing/)
    });

    it('should create a list', (done) => {
      MC.listsCreate(sampleList).then((res) => {
        dummyListId = res.id;
        expect(res.name).toEqual(sampleList.name);
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });

  //  EDIT LIST
  describe('edit list', () => {

    it('should throw error if no id given', () => {
      expect(MC.listsEdit).toThrow(/No list ID provided/)
    });

    it('should edit the dummy list', (done) => {
      var edit = {
        name: 'nameChangeEditTest'
      }
      MC.listsEdit(dummyListId, edit).then((res) => {
        expect(res.name).toEqual(edit.name)
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });

  //  ACTIVITY
  describe('get lists activity', () => {

    it('shoud throw err if no ID given', () => {
      expect(MC.listsActivity).toThrow(/No list ID/);
    });

    it('should return list activity', (done) => {
      MC.listsActivity(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });

  //  CLIENTS
  describe('get lists clients', () => {

    it('shoud throw err if no ID given', () => {
      expect(MC.listsClients).toThrow(/No list ID/);
    });

    it('should return list clients', (done) => {
      MC.listsClients(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); //describe

  //  ABUSE REPORTS
  describe('get lists abuse-report', () => {

    it('shoud throw err if no ID given', () => {
      expect(MC.listsAbuseReports).toThrow(/No list ID/);
    });

    it('should return list abuse-report', (done) => {
      MC.listsAbuseReports(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  }); //describe


  //  CATEGORIES aka groups' titles
  describe('lists INTERESTS\' categories', () => {

    it('shoud throw err if no ID given', () => {
      expect(MC.listsCategories).toThrow(/No list ID/);
    });

    it('should return list interest-categories', (done) => {
      MC.listsCategories(dummyListId).then((res) => {

        expect(res.categories).toExist();
        expect(res.categories).toBeA('array');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud create interest category in the list', (done) => {
      MC.listsCategories(dummyListId, {
        action: 'create',
        body: {
          title: 'TestValue',
          type: 'radio'
        }
      }).then((res) => {
        created_category_id = res.id;
        expect(res).toExist();
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud edit created category', (done) => {
      MC.listsCategories(dummyListId, {
        action: 'edit',
        category_id: created_category_id,
        body: { title: 'Programming'}
      }).then((res) => {
        expect(res.title).toEqual('Programming');
        done()
      }).catch((err) => done(err));
    });

    it('shoud list categories', (done) => {
      MC.listsCategories(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      }).catch((err) => done(err));
    });
  });


  //  INTERESTS aka groups' names
  describe('lists CATEGORY\'s interests', () => {
    var inner_interest_id;

    it('shoud throw err if no list ID given', () => {
      expect(MC.listsInterests).toThrow(/No category_id or list id provided/);
    });

    it('shoud create an interest inside a category', (done) => {
      MC.listsInterests(dummyListId, {
        action: 'create',
        category_id: created_category_id,
        body: {
          name: 'python',
        }
      }).then((res) => {
        inner_interest_id = res.id;
        expect(res).toExist();
        expect(res.name).toEqual('python');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud edit an interest inside a category', (done) => {
      MC.listsInterests(dummyListId, {
        action: 'edit',
        interest_id: inner_interest_id,
        category_id: created_category_id,
        body: {
          name: 'javascript',
        }
      }).then((res) => {
        expect(res).toExist();
        expect(res.name).toEqual('javascript');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud delete interes', (done) => {
      MC.listsInterests(dummyListId, {
        action: 'delete',
        category_id: created_category_id,
        interest_id: inner_interest_id,
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

    it('shoud delete created category', (done) => {
      MC.listsCategories(dummyListId, {
        action: 'delete',
        category_id: created_category_id
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done()
      }).catch( err => done( ResError( err ) ) );
    });
  }); //describe;

  //  GROWTH HISTORY
  describe('get lists growth-history', () => {

    it('shoud throw err if no ID given', () => {
      expect(MC.listsGrowthHistory).toThrow(/No list ID/);
    });

    it('should return list growth-history', (done) => {
      MC.listsGrowthHistory(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
    });

    it('should return list growth-history for month given', (done) => {
      var date;
      var month = new Date().getMonth().toString().length < 1 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      date = year + "-" + month;
      MC.listsGrowthHistory(dummyListId, String(date)).then((res) => {
        expect(res).toExist();
        done();
      }).catch((err) => {
        let status = err.data.status;
        if(status === 404) expect(1).toBe(1)
        done();
      });
    });

  });

  // MEMBERS
  describe('lists members', () => {

    it('should throw error if no id given', () => {
      expect(MC.listsMembers).toThrow(/No list ID provided/);
    });

    it('shoud create a meber', function(done) {
      var testingMemberId;
      MC.listsMembers(dummyListId, {
        action: 'create',
        body: {
          status: 'subscribed',
          email_address: 'imthebest@hotmail.com'
        }
      }).then((res) => {
        expect(res.email_address).toEqual('imthebest@hotmail.com');
        expect(res.status).toEqual('subscribed');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return all subscriber', (done) => {
      MC.listsMembers(dummyListId).then((res) => {
        expect(res.members).toExist();
        expect(res.members.length).toBe(1);
        expect(res).toExist();
        testingMemberId = res.members[0].id;
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud return single member', (done) => {
      MC.listsMembers(dummyListId,{
        single_member_id: testingMemberId
      }).then((res) => {
        expect(res).toExist();
        expect(res.id).toBe(testingMemberId);
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud edit single member', (done) => {
      MC.listsMembers(dummyListId, {
        action: 'edit',
        single_member_id: testingMemberId,
        body: {
          status: 'pending'
        }
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual('pending');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud delete member', (done) => {
      MC.listsMembers(dummyListId, {
        action: 'delete',
        single_member_id: testingMemberId
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toBe(204);
        done();
      }).catch( err => done( ResError( err ) ));
    });
  });


  //  SEGMENTS
  describe('Segments', () => {
    var segment_id;
    it('should throw error if no id given', () => {
      expect(MC.listsSegments).toThrow(/No list ID provided/);
    });

    it('shoud return segments lists', (done) => {
      MC.listsSegments(dummyListId).then((res) => {
        expect(res).toExist()
        expect(res.segments).toBeA('array')
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud create a segment', (done) => {
      MC.listsSegments(dummyListId, {
        action: 'create',
        body: {
          name: 'segment',
          static_segment: []
        }
      }).then((res) => {
        expect(res).toExist()
        expect(res.name).toBe('segment');
        segment_id = res.id;
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud edit single segment', (done) => {
      MC.listsSegments(dummyListId, {
        action: 'edit',
        segment_id: segment_id,
        body: {
          name: 'segment_edit'
        }
      }).then((res) => {
        expect(res).toExist();
        expect(res.name).toEqual('segment_edit');
        done();
      }).catch( err => done( ResError( err ) ));
    });

    it('shoud delete segment', (done) => {
      MC.listsSegments(dummyListId, {
        action: 'delete',
        segment_id: segment_id
      }).then((res) => {
        expect(res).toExist();
        expect(res.status).toBe(204);
        done();
      }).catch( err => done( ResError( err ) ));
    });

  });


  // KEEP IT LAST TO CLEANUP
  describe('delete lists', () => {
    it('should throw error if no id given', () => {
      expect(MC.listsDelete).toThrow(/No list ID provided/);
    });

    it('should delete the list', (done) => {
      MC.listsDelete(dummyListId).then((res) => {
        expect(res).toExist();
        expect(res.status).toEqual(204);
        expect(res.statusText).toBe('No Content');
        done();
      }).catch( err => done( ResError( err ) ) );
    });

  });

}); //describe_main
