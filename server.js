const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
dotenv.config();

const app = express();
const PORT = 5002;
app.use(express.json());
app.use(bodyparser.json());

const corsOptions = {
    origin : "https://localhost:5173",
    methods : ['GET','PUT','DELETE','POST'],
    allowedHeaders : ["Content-Type", "Authorization"],
    credentials:true,
    optionsSuccessStatus : 204
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("mongodb connected")})
.catch((error)=>{console.log(`error connecting ${error}`)});

app.use(authRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('Request Cookies:', req.cookies);
    next();
  });
  











app.listen(PORT, ()=>{console.log(`server connected at ${PORT}`)});