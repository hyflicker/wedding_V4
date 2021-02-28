
const express = require('express');
const mysql = require('mysql2');
const { request } = require('http');
const { response } = require('express');
const { time } = require('console');
const { type } = require('os');
const { resourceUsage } = require('process');
const app = express();
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_MYSQL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

app.listen(3001, () => console.log('listening at port 3001'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
    // console.log('I got a request!');
    const data = request.body;
    // console.log(data.inviteCode);
    let sql = `SELECT wedding_code FROM wedding_codes`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let testArray = [];
        for (let i = 0; i < result.length; i++) {
            testArray.push(`${result[i].wedding_code}`)
        }
        // console.log(testArray);
        if (testArray.includes(data.inviteCode)) {
            console.log('true')
            let newSQL = `SELECT * FROM wedding_codes WHERE wedding_code='${data.inviteCode.toUpperCase()}'`
                db.query(newSQL, (err, results) => {
                    if (err) throw err;
                    console.log(results[0])
                    response.json({
                        status: "success",
                        InviteCode: data.inviteCode,
                        name1: results[0].name1,
                        name2: results[0].name2,
                        name3: results[0].name3,
                        name4: results[0].name4,
                        name5: results[0].name5,
                        name6: results[0].name6
                    });
                })
        }else{
            // console.log('false');
            response.json({
                status: "failed",
                InviteCode: data.inviteCode
            })
        }
    })
});

app.post('/apiSubmit1', (request, response) => {
    const data = request.body;
    // console.log(data);
    let codeCheck = `SELECT * FROM wedding_codes WHERE wedding_code='${data.inviteCode}'`;
    db.query(codeCheck, (err, resultCheck) => {
        if (err) {
            console.log(err)
        }
        if (Object.keys(resultCheck).length === 0) {
            console.log('empty')
        } else {
            let sql = `UPDATE wedding_codes SET name1 = "${data.Attendee1}", name2 = "${data.Attendee2}", name3 = "${data.Attendee3}", name4 = "${data.Attendee4}", name5 = "${data.Attendee5}", name6 = "${data.Attendee6}", additional_comments = "${data.rsvpTextBox}", rsvp = '1', coming = '1', not_coming = '0' WHERE wedding_code='${data.inviteCode}'`;
            db.query(sql, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    let sql2 = `UPDATE wedding_codes SET name2 = NULL WHERE name2 = ''`
                    db.query(sql2, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let sql3 = `UPDATE wedding_codes SET name3 = NULL WHERE name3 = ''`
                    db.query(sql3, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let sql4 = `UPDATE wedding_codes SET name4 = NULL WHERE name4 = ''`
                    db.query(sql4, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let sql5 = `UPDATE wedding_codes SET name5 = NULL WHERE name5 = ''`
                    db.query(sql5, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let sql6 = `UPDATE wedding_codes SET name6 = NULL WHERE name6 = ''`
                    db.query(sql6, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let textBox = `UPDATE wedding_codes SET additional_comments = NULL WHERE additional_comments = ''`
                    db.query(textBox, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    })
                    let newSQL = `SELECT * FROM wedding_codes WHERE wedding_code='${data.inviteCode}'`
                    db.query(newSQL, (err, results) => {
                        if (err) throw err;
                        console.log(results[0])
                        response.json({
                            status: "success",
                            InviteCode: data.inviteCode,
                            name1: results[0].name1,
                            name2: results[0].name2,
                            name3: results[0].name3,
                            name4: results[0].name4,
                            name5: results[0].name5,
                            name6: results[0].name6
                        });
                    })
                }
            })
        }
    })
});

app.post('/api2', (request, response) => {
    // console.log(request.body);
    const data = request.body;
    let sql = `SELECT wedding_code FROM wedding_codes`
    db.query(sql, (err, result) => {
        if (err) throw err;
        let testArray = [];
        for (let i = 0; i < result.length; i++) {
            testArray.push(`${result[i].wedding_code}`)
        }
        // console.log(testArray);
        if (testArray.includes(data.inviteCode)) {
            console.log('true')
            let newSQL = `SELECT * FROM wedding_codes WHERE wedding_code='${data.inviteCode}'`
                db.query(newSQL, (err, results) => {
                    if (err) throw err;
                    console.log(results[0])
                    response.json({
                        status: "success",
                        InviteCode: data.inviteCode,
                        name1: results[0].name1,
                        name2: results[0].name2,
                        name3: results[0].name3,
                        name4: results[0].name4,
                        name5: results[0].name5,
                        name6: results[0].name6
                    });
                })
        }else{
            // console.log('false');
            response.json({
                status: "failed",
                InviteCode: data.inviteCode
            })
        }
    })

});

app.post('/apiSubmit2', (request, response) => {
    const data = request.body;
    console.log(data);
    let sql = `UPDATE wedding_codes SET name1 = "${data.Attendee1}", name2 = "${data.Attendee2}", additional_comments = "${data.UnableTextBox}", rsvp = '1', coming = '0', not_coming = '1' WHERE wedding_code='${data.inviteCode}'`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            let sql2 = `UPDATE wedding_codes SET name2 = NULL WHERE name2 = ''`
            db.query(sql2, (err, result) => {
                if (err) {
                    throw err;
                }
            })
            let textBox = `UPDATE wedding_codes SET additional_comments = NULL WHERE additional_comments = ''`
            db.query(textBox, (err, result) => {
                if (err) {
                    throw err;
                }
            })
            let newSQL = `SELECT * FROM wedding_codes WHERE wedding_code='${data.inviteCode}'`
            db.query(newSQL, (err, results) => {
                if (err) throw err;
                console.log(results[0])
                response.json({
                    status: "success",
                    InviteCode: data.inviteCode,
                    name1: results[0].name1,
                    name2: results[0].name2,
                    name3: results[0].name3,
                    name4: results[0].name4,
                    name5: results[0].name5,
                    name6: results[0].name6
                });
            })
        }
    })
})
