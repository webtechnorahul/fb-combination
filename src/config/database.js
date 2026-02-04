const mongoose=require('mongoose')
require('dotenv').config()
function connectMDB(){
    mongoose.connect(process.env.mongodb_url)
    .then(()=>{
        console.log("database connect successfully");
    })
}

module.exports=connectMDB;