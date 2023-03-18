// const mongoose = require('mongoose')

// const { MONGO_URI } = process.env

// exports.connect = () => {
//     mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // useCreateIndex: true,
//         // useFindAndModify: false
//     }).then(() => {
//         console.log('Successfully Connected to database')
//     }).catch((err) => {
//         console.log('Error connecting to database')
//         console.log(err)
//         process.exit(1)
//     })
// }

const mariadb = require('mariadb');

const { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, MARIADB_DATABASE, MARIADB_PORT } = process.env;

exports.connect = async () => {
    try {
        const pool = mariadb.createPool({
            host: MARIADB_HOST,
            user: MARIADB_USER,
            password: MARIADB_PASSWORD,
            database: MARIADB_DATABASE,
            port: MARIADB_PORT
        });
        console.log('mariadb-host: ', MARIADB_HOST)
        console.log('pool: ', pool)
        console.log('Successfully Connected to database');
        return pool;
    } catch (err) {
        console.log('Error connecting to database:', err);
        process.exit(1);
    }
};
