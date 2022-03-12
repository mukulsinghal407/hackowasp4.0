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

var item ={
    name:String,
    phone:String,
    location: String,
    color:String,
    brand:String,
    type: {
        type: String,
        enum : ['lost','found'],
        default: 'lost'
    }
}

const found = new mongoose.Schema({
    items: [item]
});
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    phone: {
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

const userStudent = mongoose.model("user",user);
const foundItem = mongoose.model("all",found);

app.get("/",(req,res)=>
{
    res.render("login");
});

app.get("/RAT/:user",(req,res)=>
{
    res.render("newitem",{name:req.params.user});
});

app.get("/veer/allitems",(req,res)=>{
    foundItem.find({},(err,result)=>{
        if(!err)
        {
            var itemsWtId = [];
            result[0].items.forEach(element => {
                itemsWtId.push({
                    name:element.name,
                    location:element.location,
                    brand:element.brand,
                    color:element.color,
                    type:element.type
                });
            });
            res.send(itemsWtId);
        }
        else
         res.send("Error 503");
    });
});

app.post("/login",(req,res)=>{
    const name=req.body.name.toLowerCase();
    console.log(name);
    const password=req.body.password.toLowerCase();
    console.log(password);
    // res.render("dashboard",{info:name.toUpperCase(),roll:password});
    userStudent.findOne({name:name, password:password},(err,result)=>{
        if(!err)
        {
            if(result)
             res.render("dashboard",{info:result.name.toUpperCase(),roll:result.phone});
            else
             res.render("message",{info:"The User doesn't Exists"});
        }
        else
        {
            res.render("error");
        }
    });
});

app.post("/rat/:user",(req,res)=>
{
    const item={
        name:req.body.item,
        phone:req.params.user,
        location: req.body.location,
        color:req.body.colour,
        brand:req.body.brand,
        type: req.body.typeofitem
    }
    console.log(item);
    foundItem.find({},(err,result)=>
    {
        if(!err)
        {
            result[0].items.push(item);
            result[0].save();
        }
    });
    userStudent.findOne({phone:req.params.user},(err,result)=>{
        if(!err)
        {
            if(result)
             res.render("dashboard",{info:result.name.toUpperCase(),roll:result.phone});
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