//requirements
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const moongoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const req = require("express/lib/request");

moongoose.connect("mongodb+srv://admin-mukul:Test123@cluster0.tj2jy.mongodb.net/hackowasp",{ useNewUrlParser: true, useUnifiedTopology: true });

//Setting things up
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    phone: {
        type:String,
        required: true
    }
});

const userStudent = mongoose.model("user",user);


app.get("/",(req,res)=>
{
    res.render("login");
});

app.get("/RAT/:user",(req,res)=>
{
    res.render("newitem",{name:req.params.user});
});

app.post("/login",(req,res)=>{
    const name=req.body.name.toLowerCase();
    console.log(name);
    const password=req.body.password.toLowerCase();
    console.log(password);
    res.render("dashboard",{info:name});
    // userStudent.findOne({name:name, roll:password},(err,result)=>{
    //     if(!err)
    //     {
    //         if(result)
    //          res.render("dashboard",{info:result});
    //         else
    //          res.render("message",{info:"The User doesn't Exists"});
    //     }
    //     else
    //     {
    //         res.render("error");
    //     }
    // });
});

app.listen(process.env.PORT||3000,(req,res)=>
{
    console.log("Server started at 3000");
});