import loginAdmin from "../models/admin_login.model.js";
import StudentSchema from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { v2 as cloudinary } from "cloudinary";
import { takeattendance } from "../models/takeAttendance.model.js";
import {Result} from "../models/addResult.model.js";
import {FeesSchema} from  "../models/payFees.model.js";

//admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("❌ERROR !! in admin login: missing required fields");
      return res.status(404).json({ error: "❌all field are required" });
    }

    const existAdmin = await loginAdmin.findOne({ email });

    const compPassword = bcrypt.compare(password, existAdmin.password);
    if (!existAdmin) {
      console.log("❌ERROR !! admin with email not exist");
      return res.status(404).json({ error: "❌Wrong cradential" });
    }

    const token = jwt.sign(
      {
        id: existAdmin._id,
      },
      config.JWT_ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    if (compPassword) {
      console.log("Login successfully ✅", existAdmin);
      res.cookie("jwt", token, cookieOption);
      return res
        .status(201)
        .json({ message: "Login Successfully ✅ ", token, existAdmin });
    }
  } catch (error) {
    console.log("❌Error !! in admin login:", error);
    res.status(500).json({ error: "internalserver error❌" });
  }
};

//add student  (admin)
export const addStudent = async (req, res) => {
  const {
    studentName,
    rollNo,
    DOB,
    gender,
    parentName,
    parentPhoneNo,
   // 
    state,
    city,
    //
    email,
    phoneNo,
    department,
    year,
  } = req.body;

  const { image } = req.files;

  try {
    if (
      !studentName ||
      !rollNo ||
      !DOB ||
      !gender ||
      !parentName ||
      !parentPhoneNo ||
      
      !state ||
      !city ||
      
      !email ||
      !phoneNo ||
      !department ||
      !year
    ) {
      console.log(
        "❌ERROR !! in addStudent controller: Missing required fields"
      );
      return res.status(400).json({ error: "❌All fields are required" });
    }

    if (phoneNo.length && phoneNo.length !== 10) {
      console.log("❌ERROR !! in addStudent controller: Invalid phone number");
      return res.status(400).json({ error: "❌Invalid phone number" });
    }

    if (!image || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "invalid file format. Only JPG & PNG allowed" });
    }

    //cloudinary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ error: "ERROR !! in uploading file to cloudinary" });
    }

    const existStudent = await StudentSchema.findOne({ email });

    if (existStudent) {
      console.log(
        "❌ERROR !! student with email aleardy exists:",
        existStudent.email
      );
      return res.status(400).json({
        error: "❌ Student with this email already exists:",
        email: existStudent.email,
      });
    }

    const newStudent = new StudentSchema({
      studentName,
      rollNo,
      DOB,
      gender,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      parentName,
      parentPhoneNo,
      
      state,
      city,
      
      email,
      phoneNo,
      department,
      year,
    });

    const response = await newStudent.save();
    console.log("Student registered successfully ✅ ", newStudent);
    res
      .status(201)
      .json({ message: "Student added successfully ✅ ", response },);
  } catch (error) {
    console.log("❌ERROR !! in addStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//adminview all students
export const adminViewAllStudents = async (req, res) => {
//  const { department, year } = req.body;

  try {
    // if (!department || !year) {
    //   console.log(
    //     "❌ERROR !! in adminViewAllStudents controller: Missing required query parameters"
    //   );
    //   return res
    //     .status(400)
    //     .json({ error: "department and year are required" });
    // }
    // console.log({ department, year });

    // const students = await StudentSchema.find({ department, year });
    // console.log("Students found:", students);
    // if (students.length === 0) {
    //   console.log("❌ERROR !! No students found");
    //   return res.status(404).json({ error: "No students found" });
    // }
    // console.log("Students retrieved successfully ✅", students);
    // res.status(200).json({ students });

    const data=await StudentSchema.find()
    
    if(!data){
        console.log("No data found");
        res.status(404).json({ error: "student data not found" });
    }else{
        console.log('data fetch succesfully');
        res.status(200).json(data);
    }   
   } catch (error) {
     console.log("❌ERROR !! in adminViewAllStudents controller:", error);
     res.status(500).json({ error: "internal server error" });
   }
};

//admin update student
export const UpdateStudent = async (req, res) => {
  const { Id } = req.params;
  const {
    studentName,
    rollNo,
    DOB,
    gender,
    parentName,
    parentPhoneNo,
    
    state,
    city,
    
    email,
    phoneNo,
    department,
    year,
  } = req.body;
  //const { image } = req.files;

  try {
    // if (!studentName || !rollNo || !DOB || !gender || !parentName || !parentPhoneNo || !|| !state || !city || !|| !email || !phoneNo || !department || !year) {
    //   console.log('❌ERROR !! in UpdateStudent controller: Missing required fields');
    //   return res.status(400).json({ error: "❌All fields are required" });
    // }

    // if (phoneNo.length && phoneNo.length !== 10) {
    //   console.log('❌ERROR !! in UpdateStudent controller: Invalid phone number');
    //   return res.status(400).json({ error: "❌Invalid phone number" });
    // }

    // if (!image || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }

    // const allowedFormat = ['image/png', 'image/jpeg'];
    // if (!allowedFormat.includes(image.mimetype)) {
    //   return res.status(400).json({ error: 'invalid file format. Only JPG & PNG allowed' });
    // }

    //cloudinary code
    // const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    // if (!cloud_response || cloud_response.error) {
    //   return res.status(400).json({ error: 'ERROR !! in uploading file to cloudinary' });
    // }

    const existStudent = await StudentSchema.findById({ _id: Id });
    if (!existStudent) {
      console.log("❌ERROR !! student not detail found");
      return res.status(404).json({ error: "Student not detail found" });
    }

    const updatedStudent = await StudentSchema.findByIdAndUpdate(
      existStudent._id,
      {
        studentName,
        rollNo,
        DOB,
        gender,
        // image: {
        //   public_id: cloud_response.public_id,
        //   url: cloud_response.secure_url
        // },
        parentName,
        parentPhoneNo,
        
        state,
        city,
        
        email,
        phoneNo,
        department,
        year,
      },
      { new: true }
    );

    if (!updatedStudent || updatedStudent.length === 0) {
      return res.status(404).json({ error: "❌ Student not found" });
    }

    console.log("Student updated successfully ✅", updatedStudent);
    res
      .status(200)
      .json({ message: "Student updated successfully ✅", updatedStudent });
  } catch (error) {
    console.log("❌ERROR !! in UpdateStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  const { Id } = req.params;

  try {
    const existStudent = await StudentSchema.findById({ _id: Id });
    if (!existStudent) {
      console.log("❌ERROR !! student not found");
      return res.status(404).json({ error: "Student not found" });
    }
    const deletedStudent = await StudentSchema.findByIdAndDelete(
      existStudent._id
    );
    if (!deletedStudent) {
      console.log("❌ERROR !!in deleting Student not found");
      return res.status(404).json({ error: "❌ Student not found" });
    }
    console.log("Student deleted successfully ✅", deletedStudent.fullName);
    res.status(200).json({
      message: "Student deleted successfully ✅",
      student: deletedStudent.fullName,
    });
  } catch (error) {
    console.log("❌ERROR !! in deleteStudent controller:", error);
    res.status(500).json({ error: "❌internal server error" });
  }
};

//take attendance
export const takeAttendance = async (req, res) => {
  // const { attendance, department, date, year } = req.body;
  // try {
  //   if (
  //     !attendance ||
  //     !department ||
  //     !date ||
  //     !year ||
  //     attendance.length === 0
  //   ) {
  //     console.log(
  //       "ERROR !! in takeAttendance controller required data not found"
  //     );
  //     return res.status(404).json({ error: "plese provide all data" });
  //   }

  //   const isExist = await takeattendance.findOne({ department, year, date });
  //   if (isExist) {
  //     return res
  //       .status(404)
  //       .json({ error: "Attendance already marked for this date" });
  //   }
  //   const newAttendance = new takeattendance({
  //     attendance,
  //     department,
  //     date,
  //     year,
  //   });

  //   await newAttendance.save();
  //   console.log("attendance record save successfully", newAttendance);
  //   return res.status(200).json({ message: "attendance save succesfully" });
  // } catch (error) {
  //   console.log("ERROR !! in takeAttendance conotroller:", error);
  //   res.status(500).json({ error: "internal server error" });
  // }
  try {
     const date = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-mm-dd" format
      const attendanceRecords = await takeattendance.find({ date }).populate({
        path: 'stdId',
        select: 'studentName rollNo department year'
      });
      res.status(200).json({ attendanceRecords, success: true });
  } catch (error) {
      console.log("ERROR !! in takeAttendance conotroller:", error);
      res.status(500).json({ error: error.message, success: false });
  }
};

//mark attendance
export const markAttendance = async (req, res) => {

  try {
     const { Id } = req.params;
     const { status } = req.body;
     const date = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-mm-dd" format

    // if (!Id || !status) {
    //   return res.status(400).json({ error: "Student ID and status are required" ,Id, status});
    // }
    const student = await StudentSchema.findById({ _id: Id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const updatedAttendance = await takeattendance.findOneAndUpdate(
      { stdId: student._id, date },
      { status },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance marked successfully", updatedAttendance, success: true });
  } catch (error) {
    console.log("ERROR !! in markAttendance controller:", error);
    res.status(500).json({ error: error.message, success: false });
  }
};

//attendance report
export const attendanceReport = async (req, res) => {
  try {
    const {date, limit = 5, skip = 0} = req.query;
    const query = {};
    
   if(date){
    query.date = date;
   }

   // const totalRecords = await takeattendance.countDocuments(query);
    const attendanceRecords = await takeattendance.find(query)
      .populate({
        path: 'stdId',
        select: 'studentName rollNo department year'
      })
      .sort({date: -1})
      .skip(parseInt(skip))
      .limit(parseInt(limit))

      const groupedRecords = attendanceRecords.reduce((result, record) => {
        const recordDate = record.date;
        if (!result[recordDate]) {
          result[recordDate] = [];
        }
        result[recordDate].push(record);
        return result;
      }, {});

    res.status(200).json({ attendanceRecords, groupedRecords, success: true });
  } catch (error) {
    console.log("ERROR !! in attendanceReport controller:", error);
    res.status(500).json({ error: error, success: false });
  }
}
  
//add result
export const addresult = async (req,res) => {
 try {
   const {marks} = req.body;

   if(!marks || Object.keys(marks).length === 0){
     return res.status(400).json({error:"please provide all required fields"});
   }
    const Ids = Object.keys(marks);
   const results = Ids.map(Id => {
     return {
       Id,
       marks: marks[Id]
     };
   });
    await Result.insertMany(results);
   res.status(201).json({message:"Result added successfully", success:true});
 } catch (error) {
   console.log("ERROR !! in addresult controller:", error);
   res.status(500).json({ error: error.message, success: false });
 }
}

//view result
export const Viewresult = async (req, res) => {
  try {
    const { limit = 5, skip = 0} = req.query;

   // const totalRecords = await takeattendance.countDocuments(query);
    const ResultRecords = await Result.find({})
      .populate({
        path: 'studentId',
        select: 'studentName rollNo department year'
      })
      .sort({createdAt: -1})
      .skip(parseInt(skip))
      .limit(parseInt(limit))

      const groupedRecords = ResultRecords.reduce((result, record) => {
        const recordExam = record.marks.Exam;
        if (!result[recordExam]) {
          result[recordExam] = [];
        }
        result[recordExam].push(record);
        return result;
      }, {});

    res.status(200).json({ ResultRecords, groupedRecords, success: true });
  } catch (error) {
    console.log("ERROR !! in Viewresult controller:", error);
    res.status(500).json({ error: error.message, success: false });
  }
}

//Payfees
export const Payfees = async (req, res) => {
  try {
    const { Id } = req.params;
    if (!Id) {
      console.log("student Id is required", Id);
      return res.status(400).json({ error: "student Id is required", success: false });
    }
    const { 
      date,
      fees,
    } = req.body;

    // Find the student by Id
    const student = await StudentSchema.findById(Id);
    if (!student) {
      return res.status(404).json({ error: "Student not found", success: false });
    }

const std = await FeesSchema.find({ stdId: student._id });

   // Sum all previous paid fees
const paidfees = std && std.length > 0
  ? std.reduce((sum, rec) => sum + (rec.payFeesDetails?.feesAmount), 0)
  : 0;

const totalFees = 90000;

if (totalFees < (paidfees + Number(fees))) {
  return res.status(400).json({ error: "payment Amount is too high", success: false });
}
    // Create fees record
    const feesData = new FeesSchema({
      stdId: student._id,
      paidFeesDetails: { 
        totalFees: totalFees, 
        paidFees: paidfees + Number(fees), 
        remainingFees: totalFees - (paidfees + Number(fees))
      },
      payFeesDetails: {
        feesAmount: Number(fees), 
        feesDate: date 
      },
    });

    const response = await feesData.save();
    if (response) {
      res.status(201).json({ message: "Fees paid successfully", success: true });
    } else {
      res.status(500).json({ error: "Failed to save fees", success: false });
    }
  } catch (error) {
    console.log("ERROR !! in Payfees controller:", error);
    res.status(500).json({ error: error.message, success: false });
  }
}

//feesRecord

export const feesRecord = async (req,res) => {
  try {

    const { Id } = req.params;

    const student = await StudentSchema.findById(Id);
    if (!student) {
      return res.status(404).json({ error: "Student not found", success: false });
    }

    const feesrecord = await FeesSchema.find({stdId: student._id})
    .populate({
        path: 'stdId',
        select: 'studentName rollNo department year'
      })
      .sort({createdAt: -1})

      if(!feesrecord){
        res.status(404).json({error: "No Record Found", success: false })
      }

      res.status(200).json({ feesrecord, success: true });
  } catch (error) {
      console.log("ERROR !! in feesrecord conotroller:", error);
      res.status(500).json({ error: error.message, success: false });
  }
}
