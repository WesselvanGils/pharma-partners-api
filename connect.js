// avoid duplicate code for connecting to mongoose
const mongoose = require('mongoose')

// these options are to not let mongoose use deprecated features of the mongo driver
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

async function mongo(dbName) {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`, options)
        console.log(`connection to mongo DB ${dbName} established`)
    } catch (err) {
        console.error(err)
    }
}

module.exports = {mongo}