const app=require('./src/app');
const connectMDB = require('./src/config/database');
require('dotenv').config()

connectMDB();

app.listen(3000,()=>{
    console.log("server is running on 3000");
})