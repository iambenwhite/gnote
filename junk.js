    // Imports the Google Cloud client library
    const PubSub = require('@google-cloud/pubsub');

    // Your Google Cloud Platform project ID
    const projectId = 'avian-voice-169309';

    // Instantiates a client
    const pubsubClient = PubSub({
      projectId: projectId
    });

    // The name for the new topic
    const topicName = 'my-new-topic';

    // Creates the new topic
    pubsubClient.createTopic(topicName)
      .then((results) => {
        const topic = results[0];
        console.log(`Topic ${topic.name} created.`);
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });

      //need to configure oauth here
      var options = {
    userId: 'me',
    auth: oauth2Client,
    resource: {
        labelIds: ['INBOX'],
        topicName: 'projects/id/topics/messageCenter'
    }
};

gmail.users.watch(options, function (err, res) {
    if (err) {
        // doSomething here;
        return;
    }
    // doSomething here;
});

//-----------------------