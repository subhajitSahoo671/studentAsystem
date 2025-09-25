import express from 'express';
import dotenv from 'dotenv'
import connectDB from './src/DB/connectDB.js';
import admin from './src/Routes/admin.route.js'
import student from './src/Routes/student.route.js'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config({
    path:'./env'
})
connectDB();
const app=express();
const PORT= process.env.PORT ;

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials (cookies)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

//cloudinary configuration
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

 

//admin
app.use('/api/v1/admin',admin);
app.use('/api/v1/student',student);

app.listen(PORT,()=>{
    console.log('Server running on port',PORT);
} )