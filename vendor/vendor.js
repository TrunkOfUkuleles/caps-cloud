'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const faker = require('faker');
const SNS = new AWS.SNS();
const topic = "arn:aws:sns:us-west-2:956886770179:packages.fifo"
const vendorName = "COOLIOSTUFFS"
const { Consumer } = require('sqs-consumer');


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
    pollingWaitTimeMs: 10000
})

generate.start()
