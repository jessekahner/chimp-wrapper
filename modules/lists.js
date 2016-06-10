module.exports = function (ChimpWrapper) {

  // LISTS
    // CRUD ------------------------------------------
  ChimpWrapper.prototype.lists = function(id) {
    if(!id){
      return this.http.get('/lists').then((res) => {
        return res.data;
      });
    } else {
      return this.http.get('/lists/' + id).then((res) => {
        return res.data;
      });
    }
  }

  ChimpWrapper.prototype.listsCreate = function(body){
    if(body){
      return this.post('lists', body);
    }else{
      throw new Error('Body missing');
    }
  }

  ChimpWrapper.prototype.listsEdit = function(id, body){
     if(!id) throw new Error('No list ID provided!');
     return this.patch('lists/' + id, body);
  }

  ChimpWrapper.prototype.listsDelete = function(id){
     if(!id) throw new Error('No list ID provided!');
     return this.delete('lists/' + id);
  }

    // INFO ------------------------------------------
  ChimpWrapper.prototype.listsActivity = function(id){
     if(!id) {
       throw new Error('No list ID provided!');
       return;
     }
     return this.get('lists/' + id + '/activity');
  }

  ChimpWrapper.prototype.listsAbuseReports = function(id, singleReportId){
     if(!id) {
       throw new Error('No list ID provided!');
       return;
     }
     // lists all reports
     if(!singleReportId){
       return this.get('lists/' + id + '/abuse-reports');
     }else {
       return this.get('lists/' + id + '/abuse-reports/' + singleReportId);
     }
  }

  ChimpWrapper.prototype.listsClients = function(id){
     if(!id) {
       throw new Error('No list ID provided!');
       return;
     }
     return this.get('lists/' + id + '/clients');
  }



  ChimpWrapper.prototype.listsGrowthHistory = function(id, month){
     if(!id) {
       throw new Error('No list ID provided!');
       return;
     }
     // lists all reports
     if(!month){
       return this.get('lists/' + id + '/growth-history');
     }else {
       return this.get('lists/' + id + '/growth-history/' + month);
     }
  }

  ChimpWrapper.prototype.listsCategories = function(id, options){
    // options: { action: [create|edit|delete], body[object], category_id[string] }
    if(!id) {
      throw new Error('No list ID provided!');
      return;
    }
    if(!options) return this.get('lists/' + id + '/interest-categories');

    if(options && options.action === 'create' && options.body){
      return this.post('lists/' + id + '/interest-categories', options.body);
    }
    if(options && options.action === 'edit' && options.body && options.category_id){
      return this.patch('lists/' + id + '/interest-categories/' + options.category_id, options.body);
    }
    if(options && options.action === 'delete' && options.category_id) {
      return this.delete('lists/' + id + '/interest-categories/' + options.category_id);
    }
  }

  ChimpWrapper.prototype.listsInterests = function(id, options){
    // options: { action: [create|edit|delete], body[object], category_id[string] }
    if(!id) {
      throw new Error('No category_id or list id provided');
      return;
    } else if(options && !options.action){
      throw new Error('No action property provided for listInterest options');
      return;
    }
    switch (options.action) {
      case 'create':
      return this.post('lists/' + id + '/interest-categories/' + options.category_id + '/interests', options.body);
      break;
      case 'edit':
      return this.patch('lists/' + id + '/interest-categories/' + options.category_id + '/interests/' + options.interest_id, options.body);
      break;
      case 'delete':
      return this.delete('lists/' + id + '/interest-categories/' + options.category_id + '/interests/' + options.interest_id, options.body);
      break;
    }
  }

  ChimpWrapper.prototype.listsMembers = function (id, options) {
    if(!id) {
      throw new Error('No list ID provided!');
      return;
    }

    if(!options) return this.get('/lists/' + id + '/members');

    if(options && !options.action && options.single_member_id) return this.get('/lists/' + id + '/members/' + options.single_member_id);

    if(options && options.action === 'create'){
      return this.post('/lists/' + id + '/members', options.body );
    }
    if( options && options.action === 'edit' ){
      return this.patch('/lists/' + id + '/members/' + options.single_member_id, options.body );
    }
    if( options && options.action === 'delete' ){
      return this.delete('/lists/' + id + '/members/' + options.single_member_id);
    }
  }

  ChimpWrapper.prototype.listsSegments = function (id, options) {
    if(!id) {
      throw new Error('No list ID provided!');
      return;
    }

    if(!options) return this.get('/lists/' + id + '/segments');

    if(options && !options.action && options.segment_id) return this.get('/lists/' + id + '/segments/' + options.segment_id);

    if(options && options.action === 'create'){
      return this.post('/lists/' + id + '/segments', options.body );
    }
    if( options && options.action === 'edit' ){
      return this.patch('/lists/' + id + '/segments/' + options.segment_id, options.body );
    }
    if( options && options.action === 'delete' ){
      return this.delete('/lists/' + id + '/segments/' + options.segment_id);
    }

  }

  return ChimpWrapper;
}
