// Microsserviço de Correçoes de atividades

const http = require('http');
const express = require('express');
const CorrectedActivity = require('../Models/CorrectedActivity');

const port = 3002
const app = express()

app.post('/saveCorrection', (req, res) => {
    const corrected = new CorrectedActivity();
    corrected.grade = req.body.grade;
    corrected.student = req.body.student;
    corrected.activity = req.body.activity;
    console.log('correcao', corrected);
});

app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});