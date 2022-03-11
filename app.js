//requirements
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const moongoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const req = require("express/lib/request");

moongoose.connect("mongodb+srv://admin-mukul:Test123@cluster0.tj2jy.mongodb.net/hacktu3",{ useNewUrlParser: true, useUnifiedTopology: true });

//Setting things up
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

const Student=new mongoose.Schema({
    name:String,
    roll:String,
    branch:String,
    email:String
});

const subject = new mongoose.Schema({
    branch:String,
    code:String,
    teacherCode:String
});

const teacher = new mongoose.Schema({
    name:String,
    phoneNo:String,
    teaching:[String],
    email:String,
    code:String
});

const attendace= new mongoose.Schema({
    name:String,
    subCode:String,
    min:Number,
    current:Number,
    total:Number
});

const userStudent = mongoose.model("Student",Student);
const userTeacher = mongoose.model("Teachers",teacher);
const Subject = mongoose.model("Subjects",subject);
const Attendace = mongoose.model("Attendace",attendace);


app.get("/",(req,res)=>
{
    res.render("login");
});


app.get("/:user/:subject",function(req,res){
    const name=req.params.user;
    Attendace.findOne({name:name},(err,result)=>{
        if(!err)
        {
            console.log(result);
            if(result)
             res.render("subject",{info:result})
            else 
             res.render("message",{info:"Result Not found!!"});
        }
        else
        {
            res.render("error");
        }
    });
});

app.post("/login",(req,res)=>{
    const name=req.body.name;
    const password=req.body.password;
    userStudent.findOne({name:name, roll:password},(err,result)=>{
        if(!err)
        {
            if(result)
             res.render("dashboard",{info:result});
            else
             res.render("message",{info:"The User doesn't Exists"});
        }
        else
        {
            res.render("error");
        }
    });
});

app.listen(process.env.PORT||3000,(req,res)=>
{
    console.log("Server started at 3000");
});