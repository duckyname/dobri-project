const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "server.quacksea.com",
    user: "admin_void",
    password: "SsMWcLd7ceam7afb",
    database: "admin_void"
});

app.get('/', (req, res) => {
    return res.json("From backend");
});

app.get('/all', (req, res) => {
    const sql = "SELECT * FROM 20118055_posts";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/posts', (req, res) => {
    const { user_id, title, content } = req.body;
    const sql = "INSERT INTO 20118055_posts (user_id, title, content) VALUES (?, ?, ?)";
    db.query(sql, [user_id, title, content], (err, result) => {
        if (err) return res.json(err);
        const newPost = {
            post_id: result.insertId,
            user_id,
            title,
            content,
            last_modified_20118055: new Date() // Add your modification date field if necessary
        };
        return res.json(newPost);
    });
});

app.listen(8081, () => {
    console.log("listening");
});
