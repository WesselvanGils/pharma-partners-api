require('dotenv').config()

const connect = require('./connect')

const Employee = require('./src/models/employee.model')() // note we need to call the model caching function

// connect to the databases
connect.mongo(process.env.MONGO_TEST_DB)



beforeEach(async () => {
    // drop both collections before each test
    await Promise.all([Employee.deleteMany()])
    
  
});