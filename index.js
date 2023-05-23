const express = require("express");
const fs = require("fs");
const path = require("path");
const dirName = path.join(__dirname,"timestamps");

//initialize express server framework
const app = express();

app.get("/",(req,res)=>{
    res.send("Hey this is my first web server");
});


//1.Write API endpoint which will create a text file in particular folder

app.get("/date-time",(req,res)=>{
    let date = new Date();
    let currenttimestamp = date.toUTCString().slice(0,-3);
    //Content of the file should be the current timestamp
    let content = `the last uploaded timestamp :${currenttimestamp}`;
    
    let fn = currenttimestamp.trim();
    let fname = fn.replaceAll(/[:, -]/g, '-');
    
    //Content of the file should be the current timestamp
    //The filename should be current date time.txt
    fs.writeFile(`${dirName}/${fname}.txt`,content,(err)=>{
        if(err){
            console.log(err)
            res.send("Error in writing file");
            return
        }       
        res.sendFile(path.join(dirName,`${fname}.txt`))
    })   
});

//2. Write API endpoint to retrieve all the text files in particular folder
app.get("/cur-dir-files",(req,res)=>{
    fs.readdir(dirName, (err, files) => {
        if (err){
          console.log(err);
          res.send("Error in reading dir");
          return;
    }else {
            //display current directory in terminal console
          console.log("\nCurrent directory filenames:");
          let array=[];
          files.forEach(file => {
            console.log(file);
            console.log("dir");
            array.push(`\n ${file}`);
          })     

          //display current directory files in postman
          res.send(`Current Directory Files:\n ${array}`);
        }
      })
   
});

//listen to a server
app.listen(9000, ()=>console.log(`server started in localhost:9000`));

