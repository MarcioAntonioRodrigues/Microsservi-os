// Microsserviço de Correçoes

const express = require('express');
const { publishToQueue } = require("../Services/CorrectionService");

const port = 3002
const app = express()

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/msg', async (req, res, next) => {
    
    let { grade, name, studentId } = req.body;
    
    await publishToQueue(
        "corrected activity",
        JSON.stringify({ grade, name, studentId }));
        res.status(200).send("Nota atribuída!");
    // next();
});

app.listen(port, () => {
    console.log(`Controller de Atividades escutando em http://localhost:${port}`)
});