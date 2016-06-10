## Simple Promise based Mailchimp v3 wrapper
*All methods return a Promise.*

    npm install --save chimp-wrapper

## plain calls methods
    var ChimpWrapper = require('chimp-wrapper');
    const CW = new ChimpWrapper(yourApiKeyString);
    CW.get (url);
    CW.post (url, body);
    CW.put/patch (url, body);
    CW.delete (url);

## Builder Methods
#### Lists

return all lists

    CW.lists()

return single list

    CW.lists([id|string])

create a list

    CW.listsCreate([options|object]) // where object contains required property

edit single list

    CW.listsEdit("id", [options|object]) // where object contains property to edit

delete single list

    CW.listsDelete([id|string])

get list's activity

    CW.listsActivity([list_id|string])

get list's clients

    CW.listsClients([list_id|string])

get list's abuse-reports
passing only the lists id return all reports.

    CW.listsAbuseReports([list_id|string], [single_report_id|string|optional|null])

get list's grow history
passing only the lists id return all months.

    CW.listsGrowthHistory[list_id|string], [month|format: "2016-05"])

CRUD list's Categories
    // options: { action: [create|edit|delete], body[object], category_id[string] }

    CW.listsCategories([list_id|string], [options|object])

CRUD list's Categories > Interests
    // options: { action: [create|edit|delete], body[object], category_id[string], interest_id[string] }

    CW.listsInterests([list_id|string], [options|object])

CRUD list's member
    // options: { action: [create|edit|delete], body[object], single_member_id[string], interest_id[string] }

    CW.listsInterests([list_id|string], [options|object])



## Tests
before testing rename .env-sample.json to .env.json and edit the API_KEY inside to match the one for you testing account.
all the created element gets deleted after tests.

    npm test
