**__STATUS:__**
Added campaigns methods see [WIKI](https://github.com/Kirkhammetz/chimp-wrapper/wiki/)


## Simple Promise based Mailchimp v3 wrapper for Node.js
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
Also TEST_MAIL for mail testing, and LIST_ID used in campaings testing where you can use your dummy list if you need to test.

    npm test

##Client-side support
Builded a version for client but seems like the new api doesn't accept apiKey calls, I'll give it a look in the future or make a separate repo for the client version with OAuth.
