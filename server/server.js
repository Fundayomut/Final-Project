const express = require("express")
const app =express()
app.use(express.json());



app.listen(1001,()=>{
    console.log("server ist gestartet")
})