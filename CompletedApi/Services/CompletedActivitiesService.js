const amqp = require('amqplib/callback_api');
const Activity = require('../../ActivitiesApi/Models/Activity');

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
                const { grade, name, studentId } = JSON.parse(
                    msg.content.toString()
                );

                const activityCorrected = new Activity();
                activityCorrected.id = saveLastId();
                activityCorrected.grade = grade;
                activityCorrected.name = name;
                activityCorrected.studentId = studentId;

                saveCompletedActivities(activityCorrected);
                ch.ack(msg);
            },
            { noAck: false }
        );
    });
});

const saveCompletedActivities = (activity) =>
{
    let listaDeAtividades = localStorage.getItem("Atividades_Corrigidas")
    let parselistaDeAtividades;
    if (listaDeAtividades != '')
        parselistaDeAtividades = JSON.parse(listaDeAtividades);
    else parselistaDeAtividades = []
    parselistaDeAtividades.push(activity)
    localStorage.setItem("Atividades_Corrigidas", JSON.stringify(parselistaDeAtividades))
}

const saveLastId = () =>
{
    let lastId = localStorage.getItem('last_id_saved')
    if (lastId != '')
    {
        lastId = JSON.parse(lastId);
        lastId = parseInt(lastId);
    }
    else
    {
        lastId = 0
    }
    lastId += 1;
    localStorage.setItem('last_id_saved', JSON.stringify(lastId));
    return lastId;
}

module.exports = 
{
    saveCompletedActivities
};