import mongoose from 'mongoose'

const loginAdminSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
     password:{
        type:String,
        require:true
    }
})

const loginAdmin=mongoose.model('admin-login',loginAdminSchema)

export default loginAdmin;
