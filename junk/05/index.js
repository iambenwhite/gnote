var pubsub = require('@google-cloud/pubsub')({
  projectId: 'avian-voice-169309',
  keyFilename: 'sense-dc1eff8881e8.json'
});

var topic = pubsub.topic('myTopic2');
var subscription = topic.subscription('mySub2');

// Register an error handler.
subscription.on('error', function(err) {});

// Register a listener for `message` events.
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
subscription.on('message', onMessage);

// Remove the listener from receiving `message` events.
subscription.removeListener('message', onMessage);

topic.getSubscriptions(function(err, subscriptions) {
  // `subscriptions` is an array of Subscription objects.
  var subscriptionsArray = subscriptions;
  console.log(subscriptions);
});


    //------------


