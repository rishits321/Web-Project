import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import reviewRouter from "./routes/review-routes";

const app=express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/review", reviewRouter)
//http://localhost:5000/api/user/

mongoose.connect(
        "mongodb+srv://rishits321:h2MBmKdpXhpfQpZr@cluster0.1bmx1jr.mongodb.net/Reviews?retryWrites=true&w=majority"
    ).then(
        ()=>app.listen(5000)
    ).then(
        ()=>console.log("Database Connected, Listening to localhost:5000")
    ).catch(
        (err)=>console.log(err)
);



// h2MBmKdpXhpfQpZr