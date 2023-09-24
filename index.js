const express=require('express');
const app=express();
const port=8080;

const  Note = require("./models/note.js");

app.listen(port,()=>{
    console.log(`Port is stated ${port}`);
});

const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));


main().then(()=>{
    console.log("Connection SuccessFull!..");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NotesApp');
}


const note1=new Note({
    title:"List",
    desc:"Exam Time Table",
    created_at:new Date(),
});
note1.save().then((res)=>{
    console.log(res);
});

// Show all chats
app.get("/notes",async(req,res)=>{
    let notes=await Note.find();
    res.render("index.ejs",{notes});
});


// Add new char
app.get("/notes/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/notes",(req,res)=>{
    let {title,desc}=req.body;
    let newNote=new Note({
        title:title,
        desc:desc,
        created_at:new Date()
    });
    newNote.save().then((res)=>{
        console.log(`Note was save`);
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/notes");
});

// Edit note

app.get("/notes/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let note=await Note.findById(id);
    res.render("edit.ejs",{note});
});

app.put("/notes/:id",async(req,res)=>{
    let {id}=req.params;
    let {title:newTitle,desc:newDesc}=req.body;
    let updateNote=await Note.findByIdAndUpdate(id,{title:newTitle,desc:newDesc},{runValidators:true,new:true});
    console.log(updateNote);
    res.redirect("/notes");
});


// Delete Note
app.delete("/notes/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteNote=await Note.findByIdAndDelete(id);
    console.log(deleteNote);
    res.redirect("/notes");
})