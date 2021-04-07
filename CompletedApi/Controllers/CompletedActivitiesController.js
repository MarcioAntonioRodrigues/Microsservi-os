require('../Services/CompletedActivitiesService')

const express = require('express');

const port = 3003
const app = express()


app.get('/getCorrectedActivities', async(req, res) =>
{
    var listaDeAtividades = localStorage.getItem("Atividades Corrigidas");
    listaDeAtividades = JSON.parse(listaDeAtividades);
    res.json(listaDeAtividades);
})


app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});