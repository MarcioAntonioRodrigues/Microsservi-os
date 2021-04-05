var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('../scratch');

class StudentService {


    addStudent(student) {
        let studentsList = localStorage.getItem("studentsList")
        let parseStudentList;
        if (studentsList != null) {
            parseStudentList = JSON.parse(studentsList);
        }
        else parseStudentList = [];
        parseStudentList.push(student)
        localStorage.setItem("studentsList", JSON.stringify(parseStudentList))
    }
}

module.exports = StudentService;