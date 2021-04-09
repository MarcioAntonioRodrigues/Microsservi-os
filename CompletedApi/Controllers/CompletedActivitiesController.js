require('../Services/CompletedActivitiesService')
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('../scratch');

const express = require('express');

const port = 3003
const app = express()


app.get('/getCorrectedActivities', async(req, res) =>
{
    const listaDeAtividades = localStorage.getItem("Atividades_Corrigidas");
    let parseListaDeAtividades = [];
    if (listaDeAtividades != '')
        parseListaDeAtividades = JSON.parse(listaDeAtividades);
    res.json(parseListaDeAtividades);
})


app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});