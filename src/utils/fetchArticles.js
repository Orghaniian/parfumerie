const mysql = require('mysql');

export default async function () {
    const db = mysql.createConnection({
        host: "localhost",
        user: "bob",
        password: "secret"
    })
    console.log(db)
    try {
        db.connect(err => {
            if (err) throw err;
            try {
                db.query("SELECT * FROM article", (err, result, fields) => {
                    if (err) throw err;
                    console.log(result, fields)
                })
            } catch (error) {
                console.log("fetch error: ", error)
            }

        })
    } catch (error) {
        console.log("connect error: ", error)
    }
}