import mongoose from 'mongoose'

const attendanceSchema=new mongoose.Schema({
          date:{
            type:String,  //format "yyyy-mm-dd"
            required:true,
          },
          // department:{
          //   type:String,
          //   required:true,
          // },
          // year:{
          //   type:String,
          //   required:true
          // },

          // attendance:[
          // {
            stdId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'student',
              required:true
            },
            status:{
              type:String,
              enum:['present','absent'],
             default:null,
            }
          //  }
          // ],
},{timestamps:true})

export  const takeattendance=mongoose.model('takeattendance',attendanceSchema);
