const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const restaurantlistRoutes = require("./routes/restaurantlist");
const popularfoodRoutes = require("./routes/popularfood");
const menuRoutes = require("./routes/menuRoutes");
dotenv.config();

const app = express();
const PORT = 5002;
app.use(express.json());
app.use(bodyparser.json());


// (async function() {
//   cloudinary.config({
//     cloud_name: 'dkfltzjgk',
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure:true
//   })
  
//   cloudinary.uploader.upload
// })();


const corsOptions = {
    origin : "http://localhost:5173",
    methods : ['GET','PUT','DELETE','POST'],
    allowedHeaders : ["Content-Type", "Authorization"],
    credentials:true,
    optionsSuccessStatus : 204
};


app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("mongodb connected")})
.catch((error)=>{console.log(`error connecting ${error}`)});

app.use(authRoutes);
app.use(userRoutes);
app.use(restaurantlistRoutes);
app.use(popularfoodRoutes);
app.use(menuRoutes);

app.use((req, res, next) => {console.log('Request Headers:', req.headers); console.log('Request Body:', req.body);
    console.log('Request Cookies:', req.cookies);
    next();
  });
app.listen(PORT, ()=>{console.log(`server connected at ${PORT}`)});