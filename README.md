1. Run `npm install` to generate `package.json`
2. Remove the packages from `package.json` that you won't use. Here is a list of what each does
    1. backbone: Backbone.js
    2. bluebird: For Promise support in node
    3. body-parser: For dealing with json body
    4. bootstrap: styling for Frontend
    5. css-loader: for including CSS
    6. expore-loader: for exponsive jQuery to jQuery plugins
    7. express: server
    8. file-loader: common dependency
    9. handlebars: Templates
    10. jquery: Jquery :P
    11. json-loader: for loading json files in require
    12. localtunnel: for generating a local tunnel so that external services can hit your local server
    13. mailgun: mailing service
    14. moment: date service
    15. parse: database as a service
    16. socket.io: socket server
    17. socket.io-client: socket client
    18. styler-loader: dependency of css-loader
    19. twilio: text message API
    20. underscore: data manipulation toolkit
    21. url-loader: common dependency
    22. webpack: frontend asset compressor
    23. winston: for logging
3. Copy `config.sample.js` to `config.js` (it's git ignored and should never be in repo, should be manually copied)
3. Install webpack `sudo npm install -g webpack`
4. Install nodemon `sudo npm install -g nodemon`
5. Run webpack watcher in on terminal window `webpack --watch` in project root
6. Run nodemon watchin in another terminal window `nodemon` in project root
7. Enabled/disable the modules in init that you'll be using
8. All your publically accessible content will stem from `public/app/index.js`

# USEFUL SNIPPETS
## Parse
### Get Object By Id
```js
var Person = Parse.Object.extend('Person');
(new Parse.Query(Person))
    .get(personId)
    .then(_.bind(function(data){

    })).catch(_.bind(function (err) {

    }, this));
```

### Save To DB
```js
new Person({
    name: 'Harry'
}).save().then(function () {
    //saved
}).catch(function (err) {
    //error
});
```

## Twilio
### Make A Call
```js
this.twilioClient.makeCall({
    to: '+1' + phoneNumber,
    from: this.config.twilio.fromNumber,
    url: this.config.rootUrl + '/api/v1/startCall'
});
```

### Make A Simple TwiML Response
```js
var resp = new twilio.TwimlResponse()
    .say('Hello');

res.set('Content-Type', 'text/xml');
res.end(resp.toString());
```

### Useful TwiML Responses
```js
resp.hangup(); //Hangs up
```

### Send a Text
```js
var messageTpl = Handlebars.compile(
    fs.readFileSync('template.hbs', 'utf8')
);

this.twilioClient.messages.create({
    body: messageTpl({
        //fill in template details here
    }),
    to: '+1' + phoneNumber,
    from: this.config.twilio.fromPhone
});
```

## Socket
### Emit Data on Server
```js
this.socket.emit('data', 'Some Data');
```

### Capture Data On Client
```js
var socket = require('socket.io-client');
this.socket = socket.connect();
this.socket.on('data', function (data) {
    //data
});
```

## Mailgun 
### Send Message
```
var emailTpl = Handlebars.compile(
    fs.readFileSync('template.hbs', 'utf8')
);

this.mailgun.sendText(
    config.email.fromEmail,
    toEmail,
    'Email Subject',
    emailTpl({
        //Template details here    
    })
);
```