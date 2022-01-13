const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const Employee = require('../models/employee.model')() // note we need to call the model caching function


describe('user model', function() {
  
    describe('unit tests', function() {
        it('should reject a missing employee name', async function() {
            const employee = new Employee({})
    
            await expect(employee.save()).to.be.rejectedWith(Error)
        })
    
        it('should not create duplicate user names', async function() {
            await new Employee({"_id":{"$oid":"61b9dcc2b763b8affa81d034"},"email":"testy@test.nl","password":"$2a$08$xVhv1ZOs8a0L3KaS/S5/hO.Se1oLwoskgOyFZ.3M29VrUEtWadsdO","roles":"Huisarts","__v":0,"firstName":"Test","lastName":"McTest","doctorCode":"D1","employeeCode":"M1"}).save()
            const employee = new Employee({"_id":{"$oid":"61b9dcc2b763b8affa81d034"},"email":"testy@test.nl","password":"$2a$08$xVhv1ZOs8a0L3KaS/S5/hO.Se1oLwoskgOyFZ.3M29VrUEtWadsdO","roles":"Huisarts","__v":0,"firstName":"Test","lastName":"McTest","doctorCode":"D1","employeeCode":"M1"})
            
            await expect(employee.save()).to.be.rejectedWith(Error)
    
            let count = await Employee.find().countDocuments()
            expect(count).to.equal(1)
        })
    })
  
})