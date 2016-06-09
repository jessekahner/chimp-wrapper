## Simple Promise based Mailchimp v3 wrapper
*All methods return a Promise.*

    npm install --save chimp-wrapper

## plain calls methods
    var ChimpWrapper = require('chimp-wrapper');
    const MC = new ChimpWrapper(yourApiKeyString);
    MC.get (url);
    MC.post (url, body);
    MC.put/patch (url, body);
    MC.delete (url);

## Builder Methods
#### Lists

return all lists

    MC.lists()

return single list

    MC.lists("id")

create a list

    MC.listsCreate([object]) // where object contains required property

edit single list

    MC.listsEdit("id", [object]) // where object contains property to edit

delete single list

    MC.listsDelete("id")

## Tests
before testing rename .env-sample.json to .env.json and edit the API_KEY inside to match the one for you testing account.
all the created element gets deleted after tests.

    npm test
