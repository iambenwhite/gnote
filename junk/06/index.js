var pubsub = require('@google-cloud/pubsub')({
  projectId: 'avian-voice-169309',
  keyFilename: 'sense-dc1eff8881e8.json'
});


//var subscription = topic.subscription('mySub2');

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
 
// Promises are also supported by omitting callbacks. 
// topic.publish('New message!').then(function(data) {
//   var messageIds = data[0];
// });
 
// It's also possible to integrate with third-party Promise libraries. 
// var pubsub = require('@google-cloud/pubsub')({
//   promise: require('bluebird')
// });


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

