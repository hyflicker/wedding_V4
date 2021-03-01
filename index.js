
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
    const data = request.body;
    let { name1, name2, name3, name4, name5, name6, additional_comments, wedding_code } = data;
    let sql = `SELECT wedding_code FROM wedding_codes`;
    db.execute(sql, (err, result) => {
        if (err) throw err;
        let testArray = [];
        for (let i = 0; i < result.length; i++) {
            testArray.push(`${result[i].wedding_code}`)
        }
        if (testArray.includes(wedding_code.toUpperCase())) {
            db.execute('SELECT * FROM wedding_codes WHERE wedding_code= ?', [wedding_code.toUpperCase()], (err, results) => {
                console.log(wedding_code.toUpperCase());
                if (err) throw err;
                console.log(results[0])
                response.json({
                    status: "success",
                    wedding_code: wedding_code,
                    name1: results[0].name1,
                    name2: results[0].name2,
                    name3: results[0].name3,
                    name4: results[0].name4,
                    name5: results[0].name5,
                    name6: results[0].name6
                });
            })
        } else {
            response.json({
                status: "failed",
                wedding_code: wedding_code
            })
        }
    })
});

app.post('/apiSubmit1', (request, response) => {
    const data = request.body;
    let { name1, name2, name3, name4, name5, name6, additional_comments, wedding_code } = data;
    const dname2 = name2 || null;
    const dname3 = name3 || null;
    const dname4 = name4 || null;
    const dname5 = name5 || null;
    const dname6 = name6 || null;
    const comments_to_save = additional_comments || null;
    db.query('SELECT * FROM wedding_codes WHERE wedding_code= ?', [wedding_code.toUpperCase()], (err, resultCheck) => {
        if (err) {
            throw err;
        }
        if (Object.keys(resultCheck).length === 0) {
            console.log('empty')
        } else {
            let sql = `UPDATE wedding_codes SET name1= ?, name2= ?, name3= ?, name4= ?, name5= ?, name6= ?, additional_comments= ?, rsvp ='1', coming= '1', not_coming= '0' WHERE wedding_code=?`;
            db.query(sql, [name1, dname2, dname3, dname4, dname5, dname6, comments_to_save, wedding_code], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    db.query('SELECT * FROM wedding_codes WHERE wedding_code= ?', [wedding_code.toUpperCase()], (err, results) => {
                        if (err) throw err;
                        response.json({
                            status: "success",
                            wedding_code: wedding_code,
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
    const data = request.body;
    let sql = `SELECT wedding_code FROM wedding_codes`
    db.query(sql, (err, result) => {
        let { name1, name2, name3, name4, name5, name6, additional_comments, wedding_code } = data;
        if (err) throw err;
        let testArray = [];
        for (let i = 0; i < result.length; i++) {
            testArray.push(`${result[i].wedding_code}`)
        }
        if (testArray.includes(wedding_code)) {
            db.query(`SELECT * FROM wedding_codes WHERE wedding_code=?`, [wedding_code.toUpperCase()], (err, results) => {
                if (err) throw err;
                response.json({
                    status: "success",
                    wedding_code: results[0].wedding_code,
                    name1: results[0].name1,
                    name2: results[0].name2,
                    name3: results[0].name3,
                    name4: results[0].name4,
                    name5: results[0].name5,
                    name6: results[0].name6
                });
            })
        } else {
            response.json({
                status: "failed",
                wedding_code: wedding_code
            })
        }
    })

});

app.post('/apiSubmit2', (request, response) => {
    const {name1,name2,additional_comments,wedding_code} = request.body;
    const dname2 = name2 || null;
    const comments_to_save = additional_comments || null;
    db.query(`UPDATE wedding_codes SET name1= ?,name2= ?,additional_comments= ?,rsvp= '1',coming= '0',not_coming= '1' WHERE wedding_code=?`, [name1, dname2, comments_to_save, wedding_code], (err, result) => { //breaks here...
        if (err) {
            throw err;
        } else {
            db.query(`SELECT * FROM wedding_codes WHERE wedding_code= ?`,[wedding_code.toUpperCase()], (err, results) => {
                if (err) throw err;
                response.json({
                    status: "success",
                    wedding_code: wedding_code,
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
