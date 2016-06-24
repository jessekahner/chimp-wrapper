module.exports = function (ChimpWrapper) {
  const ENDPOINT = ChimpWrapper.parseUrl('/campaigns/');
  const ACTIONS = function (campaign_id) {
    return ChimpWrapper.parseUrl('/campaigns/' + campaign_id + '/actions/');
  }
  const FEEDBACK = function (campaign_id) {
    return ChimpWrapper.parseUrl('/campaigns/' + campaign_id + '/feedback/');
  }

  // LISTS INDEX && SINGLE
  var campaigns = function(campaign_id){
    if(!campaign_id){
      return ChimpWrapper.get( ENDPOINT );
    } else {
      return ChimpWrapper.get( ENDPOINT  + campaign_id );
    }
  };

  campaigns.create = function(body){
    if(body){
      return ChimpWrapper.post( ENDPOINT, body );
    } else {
      throw new Error('No body configuration provided!');
    }
  }

  campaigns.edit = function(campaign_id, body){
    if(campaign_id && body){
      return ChimpWrapper.patch( ENDPOINT + campaign_id, body);
    } else {
      throw new Error('No campaign ID or body configuration provided!');
    }
  }

  campaigns.delete = function(campaign_id){
     if(!campaign_id) throw new Error('No campaign ID provided!');
     return ChimpWrapper.delete( ENDPOINT + campaign_id);
  }

  campaigns.checkList = function(campaign_id){
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.get( ENDPOINT + campaign_id + '/send-checklist');
  }

  campaigns.content = function(campaign_id, body){
    if(campaign_id && body){
      return ChimpWrapper.put( ENDPOINT + campaign_id + '/content', body);
    } else if(campaign_id && !body){
      return ChimpWrapper.get( ENDPOINT + campaign_id + '/content');
    } else {
      throw new Error('No campaign ID or body configuration provided!');
    }
  }

  // ACTIONS
  // ----------------------------------------------
  campaigns.send = function (campaign_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'send' );
  }

  campaigns.replicate = function (campaign_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'replicate' );
  }

  campaigns.cancel = function (campaign_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'cancel' );
  }

  campaigns.test = function (campaign_id, body) {
    if(!campaign_id || !body) throw new Error('No campaign ID or body provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'test', body );
  }

  campaigns.schedule = function (campaign_id, body) {
    if(!campaign_id || !body) throw new Error('No campaign ID or body provided!');
    if(typeof body.schedule_time === 'string'){
      return ChimpWrapper.post( ACTIONS(campaign_id) + 'schedule', body );
    } else if(typeof body.time === 'object'){
      var date = body.time;
      body.schedule_time = new Date(Date.UTC(date.year, date.month, date.day, date.hour, date.minute, date.timezone));
      return ChimpWrapper.post( ACTIONS(campaign_id) + 'schedule', body );
    }
  }

  campaigns.unschedule = function(campaign_id){
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'unschedule' );
  }

  // RSS campaing method
  campaigns.RSScancel = function (campaign_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'cancel-send' );
  }
  campaigns.RSSresume = function (campaign_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    return ChimpWrapper.post( ACTIONS(campaign_id) + 'resume' );
  }

  // FEEDBACK
  // ----------------------------------------------
  campaigns.feedback = function (campaign_id, feedback_id) {
    if(!campaign_id) throw new Error('No campaign ID provided!');
    if(feedback_id) {
      return ChimpWrapper.get( FEEDBACK(campaign_id) + feedback_id);
    }
    return ChimpWrapper.get( FEEDBACK(campaign_id) );
  }

  campaigns.feedback.create = function (campaign_id, body) {
    if(!campaign_id && !body) throw new Error('No campaign ID or body provided!');
    return ChimpWrapper.post( FEEDBACK(campaign_id), body );
  }

  campaigns.feedback.edit = function (campaign_id, feedback_id, body) {
    if(!campaign_id && !feedback_id && !body) throw new Error('No campaign or feedback ID or body provided!');
    return ChimpWrapper.patch( FEEDBACK(campaign_id) + feedback_id, body );
  }

  campaigns.feedback.delete = function (campaign_id, feedback_id) {
    if(!campaign_id && !feedback_id) throw new Error('No campaign or feedback ID provided!');
    return ChimpWrapper.delete( FEEDBACK(campaign_id) + feedback_id );
  }


  return campaigns;
}
