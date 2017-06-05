var rp = require('request-promise');

// Step 1. Create a topic
rp({
   url: 'https://pubsub.googleapis.com/v1/projects/avian-voice-169309/topics/mailSync',
   method: 'PUT',
   headers: {
     Authorization: 'Bearer accessToken'
   }
 }).then(function(response) {
   console.log(response);
   res.send(response);
 })
 .catch(function(error) {
   console.log(error.message);
   res.send(error.message);
 });

// Step 2. Create a subscription:
rp({
   url: 'https://pubsub.googleapis.com/v1/projects/avian-voice-169309/subscriptions/mailSync',
   method: 'PUT',
   headers: {
     Authorization: 'Bearer accessToken'
   },
   json: {
     topic: 'projects/avian-voice-169309/topics/mailSync',
     pushConfig: {
       pushEndpoint: 'https://developers.example.com/mailSyncHandler'
     }
   }
 }).then(function(response) {
   console.log(response);
   res.send(response);
 })
 .catch(function(err) {
   console.error(err);
   res.status(err.statusCode).send(err.error.error.message);
 });

// Step 3. Grant the Gmail API publish rights on our topic
rp({
   url: "https://pubsub.googleapis.com/v1beta2/projects/avian-voice-169309/topics/mailSync:setIamPolicy",
   method: 'POST',
   headers: {
     Authorization: 'Bearer accessToken'
   },
   data: {
     policy: {
       bindings: [{
         role: "roles/pubsub.publisher",
         members: ["serviceAccount:gmail-api-push@system.gserviceaccount.com"]
       }]
     }
   },
   json: true
 }).then(function(response) {
   console.log(response);
   res.send(response);
 })
 .catch(function(error) {
   console.log(error.message);
   res.send(error.message);
 });

// Step 4. Watch my Inbox
rp({
  url: "https://www.googleapis.com/gmail/v1/users/me/watch",
  method: "POST",
  headers: {
    Authorization: 'Bearer accessToken'
  },
  json: {     
    topicName: "projects/avian-voice-169309/topics/mailSync",
    labelIds: ["INBOX"]
  }
}).then(function(response) {
  console.log(response);
  res.send(response);
})
.catch(function(error) {
  console.error(error);
  res.send(error.message);
});