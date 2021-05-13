//Microsserviço de Turmas

const express = require('express')

const Student = require("../Models/Student")

const port = 3000
const app = express()

var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('../scratch');

app.use(express.json())

app.get('/getAllStudents', (req, res) => {
    var studentsList = localStorage.getItem("studentsList")
    studentsList = JSON.parse(studentsList)
    res.json(studentsList)
})

app.get('/getById/:id', (req, res) => {
    let studentId = req.params.id
    var studentsList = localStorage.getItem('studentsList')
    let student = new Student()
    studentsList = JSON.parse(studentsList)
    studentsList.forEach(s => {
        if(s.id == studentId)
        {
            student.id = s.id
            student.name = s.name
            student.email = s.email

            res.json(student)
        }
    });
    res.json(student)
})

app.post('/createStudent', (req, res) => {
    let student = new Student();
    student.id = req.body.id
    student.name = req.body.name
    student.email = req.body.email
    addStudent(student)
    res.send(`Criando Dados de ${student.name}!`)
})

app.listen(port, () => {
    console.log(`Controller de Alunos escutando em http://localhost:${port}`)
})

function addStudent(student)
{
    let studentsList = localStorage.getItem("studentsList")
    let parseStudentList;
    if(studentsList != null)
    {
        parseStudentList = JSON.parse(studentsList);
    }
    else parseStudentList = [];
    parseStudentList.push(student)
    localStorage.setItem("studentsList", JSON.stringify(parseStudentList))
}