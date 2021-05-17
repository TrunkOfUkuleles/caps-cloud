'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
// require('dotenv').config();
// const HOST = process.env.HOST || 'http://localhost:3000';





    const driver = Consumer.create({
        queueUrl: 'https://sqs.us-west-2.amazonaws.com/956886770179/pickup-list.fifo',
        handleMessage: async (mess) =>{
            // console.log("CONNECTED:    ....HOPEFULLY", mess)
            // console.log(`Picking up order from ${queueUrl}`)
            let paq = JSON.parse(mess.Body)
            let puk = JSON.parse(paq.Message)
            console.log("uuuuuuuu", paq, puk)
            setTimeout(async()=>{
                let enq = Producer.create({
                    queueUrl: `https://sqs.us-west-2.amazonaws.com/956886770179/${puk.vendorId}`,
                    region: 'us-west-2'
                })
                await enq.send({
                    id: `${puk.orderId}`,
                    body: JSON.stringify(puk)
                })
                console.log(`Delivered package ${paq.MessageId}`)
            }, 5000)
    
        },
              pollingWaitTimeMs: 5000
})

    driver.start()




