const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let students=[
    {   
    id: uuidv4(),
    name: "Nitish yadav",
    course: "MCA",
    results: {
        english: 96,
        maths: 95,
        Science: 98
    }
},
{   
    id: uuidv4(),
    name: "Pooja yadav",
    course: "BSC",
    results: {
        english: 96,
        maths: 95,
        Science: 98
    }
},
{   
    id: uuidv4(),
    name: "Aarti Yadav",
    course: "BCOM",
    results: {
        english: 96,
        maths: 95,
        Science: 98
    }
},
{
    id: uuidv4(),
    name: "Rohit Sharma",
    course: "BCA",
    results: {
        english: 85,
        maths: 88,
        Science: 90
    }
},
{
    id: uuidv4(),
    name: "Kajal Verma",
    course: "MBA",
    results: {
        english: 92,
        maths: 89,
        Science: 94
    }
},
{
    id: uuidv4(),
    name: "Arjun Patel",
    course: "BTech",
    results: {
        english: 78,
        maths: 82,
        Science: 80
    }
},
{
    id: uuidv4(),
    name: "Megha Singh",
    course: "MSc",
    results: {
        english: 90,
        maths: 87,
        Science: 91
    }
}
]

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})

app.get("/home",(req,res)=>{
    res.render("index.ejs",{students});
});

app.get("/home/add",(req,res)=>{
    res.render("add.ejs");
});

app.post("/home",(req,res)=>{
    let id=uuidv4();
    let {name,course,english,maths,Science}=req.body;
    let newStudent = {
        id,
        name,
        course,
        results: {
            english: Number(english),
            maths: Number(maths),
            Science: Number(Science)
        }
    };
    students.push(newStudent);
    res.redirect("/home");
});

app.get("/home/:id",(req,res)=>{
    let {id}=req.params;
    let student=students.find((s)=>id === s.id);
    res.render("display.ejs",{student});
});

app.get("/home/:id/edit",(req,res)=>{
    let {id}=req.params;
    let student=students.find((s)=>id === s.id);
    res.render("edit.ejs",{student});
});


app.patch("/home/:id",(req,res)=>{
    let {id }= req.params;
    let {name,course,english,maths,Science}=req.body;
    console.log(req.body);
    let student=students.find((s)=> id === s.id);
    if (!student) {
        return res.send("❌ Student Not Found");
    }
    if (name) student.name = name;
    if (course) student.course = course;
    if (english) student.results.english = Number(english);
    if (maths) student.results.maths = Number(maths);
    if (Science) student.results.Science = Number(Science);
    console.log(student);
    res.redirect("/home");
});

app.delete("/home/:id",(req,res)=>{
    let {id}=req.params;
    students=students.filter((s)=> id !== s.id);
    console.log(student);
    res.redirect("/home");
});
