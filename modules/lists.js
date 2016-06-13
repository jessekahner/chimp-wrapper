module.exports = function (ChimpWrapper) {
  const LISTS_ENDPOINT = ChimpWrapper.parseUrl('/lists/');

  // LISTS INDEX && SINGLE
  var lists = function(list_id){
    if(!list_id){
      return ChimpWrapper.get( LISTS_ENDPOINT );
    } else {
      return ChimpWrapper.get( LISTS_ENDPOINT  + list_id );
    }
  };

  lists.create = function (body) {
    if(body){
      return ChimpWrapper.post( LISTS_ENDPOINT , body);
    }else{
      throw new Error('Body missing');
    }
  }


  lists.edit = function(list_id, body){
     if(!list_id) throw new Error('No list ID provided!');
     return ChimpWrapper.patch( LISTS_ENDPOINT + list_id, body);
  }


  lists.delete = function(list_id){
     if(!list_id) throw new Error('No list ID provided!');
     return ChimpWrapper.delete( LISTS_ENDPOINT + list_id);
  }


  // INFO ------------------------------------------
  lists.activity = function(list_id){
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/activity');
  }

  lists.clients = function(list_id){
     if(!list_id) {
       throw new Error('No list ID provided!');
       return;
     }
     return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/clients');
  }

  lists.abuseReports = function(list_id, report_id){
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    // lists all reports
    if(!report_id){
      return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/abuse-reports');
    }else {
      return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/abuse-reports/' + report_id);
    }
  }

  lists.growthHistory = function(list_id, month){
     if(!list_id) {
       throw new Error('No list ID provided!');
       return;
     }
     // lists all reports
     if(!month){
       return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/growth-history');
     }else {
       return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/growth-history/' + month);
     }
  }


  //  CATEGORIES
  // --------------------------------------------------------------------------------

  lists.categories = function(list_id, category_id){
    // options: { action: [create|edit|delete], body[object], category_id[string] }
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!category_id) return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/interest-categories');
    return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/interest-categories/' + category_id);

  }

  lists.categories.create = function (list_id, body) {
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.post( LISTS_ENDPOINT + list_id + '/interest-categories', body);
  }

  lists.categories.edit = function (list_id, category_id, body) {
    if(!list_id || !category_id) {
      throw new Error('No list or category_id ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.patch( LISTS_ENDPOINT + list_id + '/interest-categories/' + category_id, body);
  }

  lists.categories.delete = function (list_id, category_id) {
    if(!list_id || !category_id) {
      throw new Error('No list or category_id ID provided!');
      return;
    }
    return ChimpWrapper.delete( LISTS_ENDPOINT + list_id + '/interest-categories/' + category_id);
  }

  //  INTERESTS
  // --------------------------------------------------------------------------------

  lists.interests = function(list_id, category_id, interest_id){
    var ENDPOINT = LISTS_ENDPOINT + list_id;
    if(!list_id || !category_id) {
      throw new Error('No list or category_id ID provided!');
      return;
    }
    if(!interest_id) return ChimpWrapper.get( ENDPOINT + '/interest-categories/' + category_id + '/interests');
    return ChimpWrapper.get( ENDPOINT + '/interest-categories/' + category_id + '/interests/' + interest_id );
  }

  lists.interests.create = function (list_id, category_id, body) {
    var ENDPOINT = LISTS_ENDPOINT + list_id;
    if(!list_id || !category_id) {
      throw new Error('No list or category_id ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.post( ENDPOINT + '/interest-categories/' + category_id + '/interests', body);
  }

  lists.interests.edit = function (list_id, category_id, interest_id, body) {
    var ENDPOINT = LISTS_ENDPOINT + list_id;
    if(!list_id || !category_id || !interest_id) {
      throw new Error('No list or category_id ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.patch( ENDPOINT + '/interest-categories/' + category_id + '/interests/' + interest_id, body);
  }

  lists.interests.delete = function (list_id, category_id, interest_id) {
    var ENDPOINT = LISTS_ENDPOINT + list_id;
    if(!list_id || !category_id || !interest_id) {
      throw new Error('No list or category_id or interest_id ID provided!');
      return;
    }
    return ChimpWrapper.delete( ENDPOINT + '/interest-categories/' + category_id + '/interests/' + interest_id);
  }

  //  MEMBERS
  // --------------------------------------------------------------------------------

  lists.members = function(list_id, member_id){
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!member_id) return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/members/');
    return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/members/' + member_id );
  }

  lists.members.create = function (list_id, body) {
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.post( LISTS_ENDPOINT + list_id + '/members/', body);
  }

  lists.members.edit = function (list_id, member_id, body) {
    if(!list_id || !member_id) {
      throw new Error('No list or member_id ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.patch( LISTS_ENDPOINT + list_id + '/members/' + member_id, body);
  }

  lists.members.delete = function (list_id, member_id) {
    if(!list_id || !member_id) {
      throw new Error('No list or member_id ID provided!');
      return;
    }
    return ChimpWrapper.delete( LISTS_ENDPOINT + list_id + '/members/' + member_id);
  }

  //  SEGMENTS
  // --------------------------------------------------------------------------------

  lists.segments = function(list_id, segment_id){
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!segment_id) return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/segments/');
    return ChimpWrapper.get( LISTS_ENDPOINT + list_id + '/segments/' + segment_id );
  }

  lists.segments.create = function (list_id, body) {
    if(!list_id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.post( LISTS_ENDPOINT + list_id + '/segments/', body);
  }

  lists.segments.edit = function (list_id, segment_id, body) {
    if(!list_id || !segment_id) {
      throw new Error('No list or segment_id ID provided!');
      return;
    }
    if(!body) {
      throw new Error('No request body provided!');
      return;
    }
    return ChimpWrapper.patch( LISTS_ENDPOINT + list_id + '/segments/' + segment_id, body);
  }

  lists.segments.delete = function (list_id, segment_id) {
    if(!list_id || !segment_id) {
      throw new Error('No list or segment_id ID provided!');
      return;
    }
    return ChimpWrapper.delete( LISTS_ENDPOINT + list_id + '/segments/' + segment_id);
  }

  return lists;
}
