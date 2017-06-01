    // Imports the Google Cloud client library
    const PubSub = require('@google-cloud/pubsub');

    // Your Google Cloud Platform project ID
    const projectId = 'avian-voice-169309';

    // Instantiates a client
    const pubsubClient = PubSub({
      projectId: projectId
    });


WatchRequest wr = new WatchRequest();
wr.TopicName = "projects/" + primaryLink.ggProjectId + "/topics/iLink" + segmentId;
if (labels != null && labels.Count > 0)
{
    wr.LabelIds = new List<string>();
    wr.LabelIds.Add("Label_1");
    wr.LabelFilterAction = "include";
}

WatchResponse wrr = gs.Users.Watch(wr, emailAccount).Execute();
return "HistoryId " + wrr.HistoryId.ToString();

  



    

