import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const App = () => {
  const [btnclicked, setbtnclicked] = useState('')
  const submit_btn=document.getElementById('submit-notes');
  const update_btn=document.getElementById('update-notes');
  const [notes, setnotes] = useState([1,2,3])
  function showForm(){
    const form=document.querySelector(".notes-form");
    form.style.display='flex';
    update_btn.style.display="none";
    submit_btn.style.display="block";

  }
  function hideForm(){
    const form=document.querySelector(".notes-form");
    form.style.display='none';
  }
   async function showNotes(){
    const AllNotes=await axios.get("https://fb-combination.onrender.com/notes")
    setnotes(AllNotes.data)
   }
  const submitNote=async(e)=>{
    const id=document.querySelector(".notes-form").id;
    e.preventDefault();
    console.log(id)
     const {title,description}=e.target.elements
    if(btnclicked==="submit"){
      const created= await axios.post("https://fb-combination.onrender.com/notes",{title:title.value,description:description.value})
      .then(()=>{
        console.log("notes created")
      })
      showNotes();
    }
    else if(btnclicked==="update"){
      const data=await axios.put('https://fb-combination.onrender.com/notes/update/'+id,{title:title.value,description:description.value})
      .then(()=>{
        console.log("notes update");
      })
      showNotes()
    }
    else{
      console.log("error")
    }
  }
 async function findOne(id){

    const {data}=await axios.get("https://fb-combination.onrender.com/notes/findone/"+id);

    submit_btn.style.display="none";
    update_btn.style.display="block";
    const form=document.querySelector(".notes-form");
    const title=document.getElementById("title");
    const description=document.getElementById("description");
    form.style.display='flex';
    form.id=id;
    title.value=data[0].title;
    description.value=data[0].description;

  }
  function noteDelete(id){
    axios.delete("https://fb-combination.onrender.com/notes/delete/"+id)
    .then(()=>console.log("notes deleted"))
    showNotes()
  }


  useEffect(()=>{
    showNotes();
  },[])

  return (
   <>
   <nav>
    <h3>Notes Library</h3>
    <div className="links">
      <button onClick={showForm}>Create</button>
    </div>
   </nav>
   <div className="notes">
      <form className='notes-form' onSubmit={submitNote}>
        <span id='hide' onClick={()=>hideForm()}><i className="ri-close-line"></i></span>
        <input type="text" name="title" id='title' placeholder='enter title' required/>
        <input type="text" name="description" id='description' placeholder='enter description' required/>
        
        <button id='submit-notes' name='submit' onClick={()=>setbtnclicked("submit")}>submit</button>
        <button id='update-notes' name='update'onClick={()=>setbtnclicked("update")}>Update</button>
      </form>
   </div>
   <h2 className='heading'>All Notes</h2>
   <div className="show-notes">
    {notes.map((note)=>{
      return <div key={notes._id} className="card">
    <h2>{note.title}</h2>
    <p>{note.description}</p>
    <div className="btn">
      <button onClick={()=>{
        noteDelete(note._id)
      }}>Delete</button>
      <button onClick={()=>{
        findOne(note._id)
      }}>Update</button>
    </div>
   </div>
    })}
   </div>
   
   </>
  )
}

export default App