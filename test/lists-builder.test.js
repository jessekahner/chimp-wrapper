var expect = require('expect');
var ChimpWrapper = require('../index');
require('dot-env')
const MC = new ChimpWrapper( process.env.API_KEY );

describe('List builder', function() {
  //this.timeout(5000*2);

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

  // created by createMethod
  // before((done) => {
  //   MC.post('lists', sampleList).then((res) => {
  //     dummyListId = res.id;
  //     done();
  //   });
  // });

  // DELETED ON LAST TEST
  // after((done) => {
  //   MC.delete(`/lists/${dummyListId}`).then(() => {
  //     done();
  //   });
  // })

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
  })

})
