import e from 'express';
import mongoose from 'mongoose'

const studentSchema=new mongoose.Schema({
    
    //student information
    studentName:{type:String,require:true},
    rollNo:{type:String, require:true,
    },
      DOB:{
        type:Date,
        require:true
    },
      gender:{
        type:String,
        enum:['male','female','other'],
        require:true
    },
      image:{
        public_id:{
          type:String,
          require:true},
        url:{
          type:String,
          require:true}
    },
    //parent info
      parentName:{
        type:String,
        require:true
    },
      parentPhoneNo:{
        type:String,
        require:true,
        minlength:0,
        maxlength:10
    },
    //address
    //   country:{
    //     type:String,
    //     require:true
    // },
      state:{
        type:String,
        require:true
    },
      city:{
        type:String,
        require:true
    },
    //   zipCode:{
    //     type:Number,
    //     require:true
    // },
    //contact information
      email:{
        type:String,
        require:true,
        unique:true
    },
      phoneNo:{
        type:String,
        require:true,
        minlength:0,
        maxlength:10
    },
    //academic information
      department:{
        type:String,
        require:true
    },
      year:{
        type:String,
        require:true
    },

},{timestamps:true})

const StudentSchema=mongoose.model('student',studentSchema);

export default StudentSchema;