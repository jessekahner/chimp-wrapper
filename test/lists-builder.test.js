var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );

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
    });
  });

  it('should return single lists', (done) => {
    MC.lists(dummyListId).then((res) => {
      expect(res).toExist();
      expect(res).toBeA('object');
      expect(res.id).toEqual(dummyListId);
      done();
    });
  });

  describe('create list', () => {
    var createdListId;
    it('should throw error if wrong option provided', () => {
      expect(MC.listsCreate).toThrow(/missing/)
    });
    it('should create a list', (done) => {
      MC.listsCreate(sampleList).then((res) => {
        dummyListId = res.id;
        expect(res.name).toEqual(sampleList.name);
        done();
      });
    })
  });

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
      })
    });
  });

  describe('get lists activity', () => {
    it('shoud throw err if no ID given', () => {
      expect(MC.listsActivity).toThrow(/No list ID/);
    });

    it('should return list activity', (done) => {
      MC.listsActivity(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
    });
  });

  describe('get lists clients', () => {
    it('shoud throw err if no ID given', () => {
      expect(MC.listsClients).toThrow(/No list ID/);
    });

    it('should return list clients', (done) => {
      MC.listsClients(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
    });
  });

  describe('get lists abuse-report', () => {
    it('shoud throw err if no ID given', () => {
      expect(MC.listsAbuseReports).toThrow(/No list ID/);
    });

    it('should return list abuse-report', (done) => {
      MC.listsAbuseReports(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
    });
  });

  describe('lists interests\' categories', () => {
    it('shoud throw err if no ID given', () => {
      expect(MC.listsCategories).toThrow(/No list ID/);
    });

    it('should return list interest-categories', (done) => {
      MC.listsCategories(dummyListId).then((res) => {
        expect(res).toExist();
        done();
      });
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
      }).catch((err) => done(err));
    });
    it('shoud edit created category', (done) => {
      MC.listsCategories(dummyListId, {
        action: 'edit',
        category_id: created_category_id,
        body: { title: 'Modified Title'}
      }).then((res) => {
        expect(res.title).toEqual('Modified Title');
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

  describe('lists interests', () => {
    var inner_interest_id;
    it('shoud throw err if no list ID given', () => {
      expect(MC.listsInterests).toThrow(/No category_id or list id provided/);
    });
    it('shoud create an interest inside a category', (done) => {
      MC.listsInterests(dummyListId, {
        name: 'interest_name',
        action: 'create',
        category_id: created_category_id
      }).then((res) => {
        inner_interest_id = res.id;
        expect(res).toExist();
        expect(res.name).toEqual('interest_name');
        done();
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done();
      })
    });
    it('shoud edit an interest inside a category', (done) => {
      MC.listsInterests(dummyListId, {
        name: 'interest_name_edited',
        category_id: created_category_id,
        action: 'edit',
        interest_id: inner_interest_id,
      }).then((res) => {
        expect(res).toExist();
        expect(res.name).toEqual('interest_name_edited');
        done();
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done();
      })
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
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done();
      })
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
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done();
      });
    });
  });

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
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done();
      });
    });
  });

  // MEMBERS
  describe('delete lists', () => {
    it('should throw error if no id given', () => {
      expect(MC.listsMembers).toThrow(/No list ID provided/);
    });

    it('shoud create a meber', (done) => {
      MC.listsMembers(dummyListId, {
        action: 'create',
        body: {
          status: 'subscribed',
          email: 'test@gmail.com'
        }
      }).then((res) => {
        console.log(res);
        expect(res).toExist();
        done();
      }).catch(function (err) {
        if(err) console.log(err.data.errors);
        done(err.errors);
      });
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
      })
    })
  });

});
