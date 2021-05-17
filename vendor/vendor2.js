'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const faker = require('faker');
const SNS = new AWS.SNS();
const topic = "arn:aws:sns:us-west-2:956886770179:packages.fifo"
const vendorName = "SANDY"
const { Consumer } = require('sqs-consumer');

const Q = new AWS.SQS()
 Q.createQueue({QueueName: vendorName, function(err, data) {
    if (err) {console.error(err.message)} // an error occurred
    console.log("Q up?: ", data); 
}});

setInterval(async ()=>{
    let newOrder = {
        customer: faker.name.findName(),
        orderId: faker.datatype.uuid(),
        vendorId: vendorName
    }

let payload = {
    Message: JSON.stringify(newOrder), 
    TopicArn: topic, 
    MessageGroupId: newOrder.orderId, 
    MessageDeduplicationId: faker.datatype.uuid()
}
    SNS.publish(payload).promise().then(res => {
        console.log("Requesting pickup for package delivery ASAP", res)}).catch(err => console.error(err.message))
}, 10000)

const generate = Consumer.create({
    queueUrl: `https://sqs.us-west-2.amazonaws.com/956886770179/${vendorName}`,
    handleMessage: async(mess) => console.log("Delivered Package: ", JSON.parse(mess.Body).orderId),
    pollingWaitTimeMs: 6000
})

generate.start()
