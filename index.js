const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college',
    password: 'Nitish@108'
});

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

app.get("/home", (req, res) => {
    let q = `SELECT * FROM student`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.render("index.ejs", { results });
        });
    } catch (err) {
        console.log(err);
    }

});

app.get("/home/add", (req, res) => {
    res.render("add.ejs");
});

app.post("/home", (req, res) => {
    let id = uuidv4();
    let { name, course, english, maths, science } = req.body;
    let student = [id, name, course, english, maths, science];
    let q = `INSERT INTO student (id,name,course,english,maths,science) VALUES (?,?,?,?,?,?)`;
    try {
        connection.query(q, student, (err, result) => {
            if (err) throw err;
            console.log("student added to the database");
            res.redirect("/home");
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/home/:id", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM student WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let student = result[0];
            res.render("display.ejs", { student });
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM student WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let student = result[0];
            res.render("edit.ejs", { student });
        });
    } catch (err) {
        console.log(err);
    }
});


app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let { name, course, english, maths, science } = req.body;
    name    = name?.trim()    || null;
    course = course?.trim()  || null;

    english = english === "" ? null : Number(english);
    maths   = maths   === "" ? null : Number(maths);
    science = science === "" ? null : Number(science);
    let students=[name, course, english, maths, science,id];
    let q = `SELECT * FROM student WHERE id=?`;
    try {
        connection.query(q,[id], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.send("❌ Student Not Found");
            } else {
                let q2 =`UPDATE student SET
                           name = IFNULL(?, name),
                           course = IFNULL(?, course),
                           english = IFNULL(?, english),
                           maths = IFNULL(?, maths),
                           science = IFNULL(?, science)
                         WHERE id = ?
                         `;
                try {
                    connection.query(q2, students, (err, result) => {
                        if (err) throw err;
                        res.redirect("/home");
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    let q=`DELETE FROM student WHERE id=?`;
    connection.query(q,[id],(err,result)=>{
        try{
            if (err) throw err;
            console.log(result);
        }catch(err){
            console.log(err);
        }
    });
    res.redirect("/home");
});
