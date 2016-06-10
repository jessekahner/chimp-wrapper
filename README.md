[WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/)

**__STATUS:__** Only plain and lists' methods implemented, campaing and reports incoming.

## Simple Promise based Mailchimp v3 wrapper
*All methods return a Promise.*

    npm install --save chimp-wrapper

## Basic methods calls

**Insert API path only without protocol/domainname, the full url will be geneted from you API key (EG: /lists)**
_you can use relative or absolute path it will be generated as a absolute anyway_

    var ChimpWrapper = require('chimp-wrapper');
    const CW = new ChimpWrapper(yourApiKeyString);

    CW.get (PATH);
    CW.post (PATH, body);
    CW.put/patch (PATH, body);
    CW.delete (PATH);

## Builder Methods

See [WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/Builder-Methods)


## Tests
before testing rename .env-sample.json to .env.json and edit the API_KEY inside to match the one for you testing account.
all the created element gets deleted after tests.

    npm test
