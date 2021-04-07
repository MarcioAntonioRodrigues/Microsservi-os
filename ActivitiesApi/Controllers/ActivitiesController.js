//Microsserviço de Atividades

const http = require('http');
const express = require('express');
const Activity = require('../Models/Activity');
const ActivityDto = require('../Models/ActivityDto');
const ActivityService = require('../Services/ActivtyService')

const port = 3001
const app = express()

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('../scratch');

var student = null;

app.use(express.json());

app.get('/all', (req, res) => {
    var listaDeAtividades = localStorage.getItem("listaDeAtividades");
    listaDeAtividades = JSON.parse(listaDeAtividades);
    res.json(listaDeAtividades);
})

app.post('/create', (req, res) => {
    let activity = new Activity();
    activity.id = req.body.id;
    activity.name = req.body.name;
    // activity.grade = null;
    activity.studentId = req.body.studentId;
    const activityService = new ActivityService();
    activityService.addActivity(activity);
    res.send(`Criando Dados de ${activity.name}!`);
})

app.get('/getActivityByIdStudent/:id', (req, res) =>
{
    let studentId = req.params.id;
    let activitiesList = [];
    var listaDeAtividades = localStorage.getItem("listaDeAtividades")
    listaDeAtividades = JSON.parse(listaDeAtividades)
    listaDeAtividades.forEach(a => {
        if (a.studentId === studentId)
        {
            let activity = new Activity();
            activity.id = a.id;
            activity.name = a.name;
            activity.grade = a.grade;
            activity.studentId = a.studentId;
            activitiesList.push(activity);
        }
    });
    
    http.get(`http://localhost:3000/getById/${studentId}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
        data += chunk;
        });

        resp.on('end', () => {
        student = JSON.parse(data)
        });
    });

    if (activitiesList.length > 0)
        setTimeout(() => {
            let activityDto = new ActivityDto();
            activityDto.student = student;
            activityDto.activitiesList = activitiesList;
            res.json(activityDto)
        }, 2000);
    else res.json([]);
})

app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});
