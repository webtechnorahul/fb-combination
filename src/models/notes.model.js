const mongoose=require('mongoose');
const notes=new mongoose.Schema({
    title:String,
    description:String
});

const notesModel=mongoose.model('notes',notes)

module.exports=notesModel;