const express=require('express');
const notesModel = require('./models/notes.model');
const cors=require('cors');
const app=express();
const path=require('node:path')
app.use(cors());
app.use(express.json())
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.send("hello");
})

app.get('/notes',async (req,res)=>{
    const data= await notesModel.find();
    res.status(200).json(data);
})
app.post('/notes',async(req,res)=>{
    const {title,description}=req.body;
    const notes=await notesModel.create({title,description});
    res.status(201).json(notes);
})
app.patch('/:id',async(req,res)=>{
    const id=req.body;
    const {title,description}=req.body
    const updateNotes=await notesModel.updateOne({id:id,title:title,description:description});
    res.status(201).json(updateNotes);
})
app.delete('/:id',async (req,res)=>{
    const id=req.body
    const deleteNotes=await notesModel.deleteOne({id:id});
    res.status(200).json(deleteNotes)
})

app.get('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

module.exports=app;