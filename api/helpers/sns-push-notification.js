const AWS = require("aws-sdk");

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const sns = new AWS.SNS({apiVersion: '2010-03-31'});


module.exports = {
    publishNotification,
    createNotificationTopic
}

async function createNotificationTopic(topic)
{
    const params ={
        Name: topic
    };
    const topicArn = await sns.createTopic(params,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data); // returns topic ARn
            return data;
        }
    });
    return topicArn;
}

function publishNotification(post, user, imageUrl){
    const message = {
        topic: "jmmbcfgpost",
        image: imageUrl, 
        userId: user.id, 
        url: "http://localhost:3001/",
        title: "New Post By: " + user.first_name + " " + user.last_name, 
        text: post.content.substring(0,90)+"...", 
    }
    console.log(message);
    const params = {
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify(message)
    };
    console.log(params)


    // Create promise and SNS service object
    let publishTextPromise = sns.publish(params).promise();

        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(
        function(data) {
            console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });

}