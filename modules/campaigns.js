module.exports = function (ChimpWrapper) {
  const ENDPOINT = ChimpWrapper.parseUrl('/campaigns/');

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
      throw new Error('Body configuration missing!');
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

  return campaigns;
}
