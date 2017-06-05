

var pubsub = require('@google-cloud/pubsub')({
  projectId: 'avian-voice-169309',
  keyFilename: 'sense-dc1eff8881e8.json'
});

var topic = pubsub.topic('myTopic2');
var subscription = topic.subscription('mySub2');


topic.subscribe('mySub2', function(err, subscription) {
  // Register listeners to start pulling for messages. 
  console.log('watching subscription');

  function onError(err) {
    console.log('topic subscription error: ' + err);
  }
  function onMessage(message) {
    console.log('subscription!');
  }
  subscription.on('error', onError);
  subscription.on('message', onMessage);
 
  // Remove listeners to stop pulling for messages. 
  subscription.removeListener('message', onMessage);
  subscription.removeListener('error', onError);

  //console.log(subscription);
});

pubsub.getSubscriptions(function(err, subscriptions) {
  //console.log(subscriptions);
});

// function onMessage(message) {
//   console.log('watching it!');
// }

/* 
// Reference a topic that has been previously created. 
var topic = pubsub.topic('myTopic2');
 
// Publish a message to the topic. 
topic.publish('New message!', function(err) {});
 
// Subscribe to the topic. 
topic.subscribe('mySub2', function(err, subscription) {
  // Register listeners to start pulling for messages. 
  function onError(err) {}
  function onMessage(message) {}
  subscription.on('error', onError);
  subscription.on('message', onMessage);
 
  // Remove listeners to stop pulling for messages. 
  subscription.removeListener('message', onMessage);
  subscription.removeListener('error', onError);

  //console.log(subscription);
});


function onMessage(message) {
  // Called every time a message is received.

  // message.id = ID of the message.
  // message.ackId = ID used to acknowledge the message receival.
  // message.data = Contents of the message.
  // message.attributes = Attributes of the message.
  // message.timestamp = Timestamp when Pub/Sub received the message.

  // Ack the message:
  // message.ack(callback);

  // Skip the message. This is useful with `maxInProgress` option when
  // creating your subscription. This doesn't ack the message, but allows
  // more messages to be retrieved if your limit was hit.
  // message.skip();
  console.log('watching it!');
}

*/

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

//var projectId = 'avian-voice-169309';




// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
//var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var SCOPES = ['https://mail.google.com/'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  //authorize(JSON.parse(content), listLabels);
  authorize(JSON.parse(content), watchAccount);


  //authorize(JSON.parse(content), testTopicPermissions);
  //testTopicPermissions();
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  var gmail = google.gmail('v1');
  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var labels = response.labels;
    if (labels.length == 0) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('- %s', label.name);
      }
    }
  });
}

function watchAccount(auth) {
    console.log('watching account');
    var gmail = google.gmail('v1');
    var options = {
    userId: 'me',
    auth: auth,
    resource: {
        labelIds: ['INBOX'],
        topicName: 'projects/avian-voice-169309/topics/myTopic2'
        }
    };

    gmail.users.watch(options, function (err, res) {
        if (err) {
            // doSomething here;
            console.log(err);
            return;
        }
        // doSomething here;
        //console.log(res);
        console.log(JSON.stringify(res, null, 4));
    });
 }

