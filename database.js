const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bu_home_project',
    port: 3306
})
conn.connect()
export default conn