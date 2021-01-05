const mysql = require('mysql');

export default function () {
    const db = mysql.createConnection({
        host: "localhost",
        user: "bob",
        password: "secret"
    })

    return db;
}