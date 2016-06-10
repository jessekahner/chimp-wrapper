## Simple Promise based Mailchimp v3 wrapper
*All methods return a Promise.*

    npm install --save chimp-wrapper

## Basic methods calls
    var ChimpWrapper = require('chimp-wrapper');
    const CW = new ChimpWrapper(yourApiKeyString);

    CW.get (url);
    CW.post (url, body);
    CW.put/patch (url, body);
    CW.delete (url);

## Builder Methods
  See [WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/Lists'-Methods)


## Tests
before testing rename .env-sample.json to .env.json and edit the API_KEY inside to match the one for you testing account.
all the created element gets deleted after tests.

    npm test
