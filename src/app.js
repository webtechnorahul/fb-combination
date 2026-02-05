const express=require('express');
const notesModel = require('./models/notes.model');
const cors=require('cors');
const app=express();
const path=require('node:path');
const { console } = require('node:inspector');
app.use(cors());
app.use(express.json())
app.use(express.static('./public'))

app.get('/notes',async (req,res)=>{
    const data= await notesModel.find();
    res.status(200).json(data);
})
app.post('/notes',async(req,res)=>{
    const {title,description}=req.body;
    const notes=await notesModel.create({title,description});
    res.status(201).json(notes);
})
app.get('/notes/findone/:id',async(req,res)=>{
    const {id}=req.params;
    const onedata=await notesModel.find({_id:id})
    res.status(200).json(onedata);
})
app.put('/notes/update/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    const updatedata=await notesModel.findOneAndUpdate({_id:id},{title:title,description:description})
    res.status(200).json(updatedata)
})
app.delete('/notes/delete/:id',async (req,res)=>{
    const {id}=req.params;
    const deleteNotes=await notesModel.deleteOne({_id:id});
    res.status(200).json(deleteNotes)
})

app.get('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

module.exports=app;