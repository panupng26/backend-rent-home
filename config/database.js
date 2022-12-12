const mongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => {
        console.log('Successfully Connected to database')
    }).catch((err) => {
        console.log('Error connecting to database')
        console.log(err)
        process.exit(1)
    })
}