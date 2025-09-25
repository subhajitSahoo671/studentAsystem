import mongoose from 'mongoose'

const stdSignupSchema=new mongoose.Schema({
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }    
});


 const signupSchema=mongoose.model('stdSignup',stdSignupSchema);
 export default signupSchema;