const express = require("express");
const fs = require("fs");
const path = require("path");
const dirName = path.join(__dirname,"timestamps");

//initialize express server framework
const app = express();

hallData = [{
    id:1,
    room:2
}]

app.get("/",(req,res)=>{
    res.send("welcome to hall ticket booking");
});

app.get("/hall-details",(req,res)=>{
    const {roomtype} = req.query;
    console.log(roomtype)
    res.send(hallData);
});



//listen to a server
app.listen(9000, ()=>console.log(`server started in localhost:9000`));

