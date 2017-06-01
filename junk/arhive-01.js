

'use strict';

var readline = require('readline');

var google = require('googleapis/lib/googleapis.js');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '353242605326-s4npkdok7kgt2tquiqk9a8c2qp1i0lbt.apps.googleusercontent.com';
var CLIENT_SECRET = '5PlrxaiLXb52n2xjTmmOoFZb';
var REDIRECT_URL = '';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});