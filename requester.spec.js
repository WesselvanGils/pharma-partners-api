const chai = require('chai')

// make chai work with http requests
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('./src/app')

// export an object that receives test requests
// chai calls 'listen' on the app object
// keepOpen makes sure the app is not closed after a test
let requester = chai.request(app).keepOpen()
module.exports = requester

// close the app after all tests
after(function() {
    requester.close()
})
