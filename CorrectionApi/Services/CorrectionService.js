// import amqp from 'amqplib / callback_api';

var amqp = require('amqplib/callback_api')

const CONN_URL = 'amqps://acjlpsyp:uVLQgx9SRnlyof6SbHyBf5AHZODATfnH@fish.rmq.cloudamqp.com/acjlpsyp';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

const publishToQueue = async (queueName, data) => {
    console.log('data', data)
    ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
};

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = {
    publishToQueue
};