[WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/)

**__STATUS:__** Only plain and lists' query builder methods implemented, campaing and reports incoming.
**__BREAKING_CHANGES** from 0.1 to 0.2

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

## Query Builder Methods

See [WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/Query-Builder-Methods)


## Tests
there are tests suites in test/
before testing rename .env-sample.json to .env.json and edit the API_KEY inside to match the one for you testing account.
all the created element gets deleted after tests.

    npm test
