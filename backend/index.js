import express from "express"

const app=express()

app.get("/", (req,res)=>{
    res.send("Server aslaa.")
})
const port=process.env.PORT||3000

app.listen(port,()=>{
    console.log("Server at https://localhost:${port}")
})