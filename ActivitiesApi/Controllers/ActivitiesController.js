//Microsserviço de Atividades

const http = require('http');
const express = require('express');
const Activity = require('../Models/Activity');
const ActivityDto = require('../Models/ActivityDto');

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
    // activity.studentId = req.body.studentId;
    addActivity(activity);
    res.send(`Criando Dados de ${activity.name}!`);
})

app.get('/getActivityByIdStudent/:id', (req, res) =>
{
    let studentId = req.params.id;
    let activity = new Activity();
    var listaDeAtividades = localStorage.getItem("listaDeAtividades")
    listaDeAtividades = JSON.parse(listaDeAtividades)
    listaDeAtividades.forEach(a => {
        if(a.studentId == studentId)
        {
            activity.id = a.id;
            activity.name = a.name;
            activity.grade = a.grade;
            activity.studentId = a.studentId;
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
    })

    setTimeout(() => {
        let activityDto = new ActivityDto();
        activityDto.student = student;
        activityDto.activity = activity;
        res.json(activityDto)
    }, 2000);

})

function addActivity(activity)
{
    let listaDeAtividades = localStorage.getItem("listaDeAtividades")
    let parselistaDeAtividades;
    if(parselistaDeAtividades != null)
        parselistaDeAtividades = JSON.parse(listaDeAtividades);
    else parselistaDeAtividades = []
    parselistaDeAtividades.push(activity)
    localStorage.setItem("listaDeAtividades", JSON.stringify(parselistaDeAtividades))
}

app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});
