const mongoose=require('mongoose');

const noteSchema=new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    created_at:{
        type:Date
    },
});

const Note=mongoose.model("Note",noteSchema);
module.exports=Note;