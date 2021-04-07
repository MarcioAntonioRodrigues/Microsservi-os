var amqp = require('amqplib/callback_api');

var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('../scratch');

const CONN_URL = 'amqps://acjlpsyp:uVLQgx9SRnlyof6SbHyBf5AHZODATfnH@fish.rmq.cloudamqp.com/acjlpsyp';

amqp.connect(CONN_URL, function (err, conn)
{
    conn.createChannel(function (err, ch)
    {
        ch.consume(
            "corrected activity",
            function (msg) {
                const { queueName, payload } = JSON.parse(
                    msg.content.toString()
                );
                saveCompletedActivities(queueName, payload);
                ch.ack(msg);
            },
            { noAck: false }
        );
    });
});

const saveCompletedActivities = (ActivityName, activity) =>
{
    let listaDeAtividades = localStorage.getItem("Atividades Corrigidas")
    let parselistaDeAtividades;
    if (listaDeAtividades != null)
        parselistaDeAtividades = JSON.parse(listaDeAtividades);
    else parselistaDeAtividades = []
    parselistaDeAtividades.push(activity)
    localStorage.setItem("Atividades Corrigidas", JSON.stringify(parselistaDeAtividades))
}

module.exports = 
{
    saveCompletedActivities
};