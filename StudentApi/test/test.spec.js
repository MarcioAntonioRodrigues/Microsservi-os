const chai = require('chai')
const expect = chai.expect
const StudentService = require("../Services/StudentService")

describe('Sudents Tests', () => {
    it('Get class name', (done)=> {
        let studentService = new StudentService()
        let classId = '0001'
        const resultado = studentService.getClassName(classId)
        expect(resultado).be.equal('Turma de Engenharia')
        done()
    })
})