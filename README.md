## Simple Promise based Mailchimp v3 wrapper

    npm install --save chimp-wrapper


## methods
  - get (url)
  - post (url, body)
  - put/patch (url, body)
  - delete (url)

## examples
    var ChimpWrapper = require('chimp-wrapper');
    const MC = new ChimpWrapper(yourApiKeyString);

    //  Get lists
    MC.get('/lists')
      .then( (res) => {
        console.log(res);
      })
      .catch( (err) => {
        console.log(err)
      })

    //  Delete list
    MC.delete('/lists/{LIST_ID}')
      .then( (res) => {
        console.log(res);
      })
      .catch( (err) => {
        console.log(err)
      })

## Tests
  npm test
