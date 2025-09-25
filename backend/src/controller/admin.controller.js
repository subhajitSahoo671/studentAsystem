import loginAdmin from "../models/admin_login.model.js";
import StudentSchema from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { v2 as cloudinary } from "cloudinary";
import { takeattendance } from "../models/takeAttendance.model.js";

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
        res.status(404).json("student data not found")
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
  const { studentId } = req.params;
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

    const existStudent = await StudentSchema.findById({ _id: studentId });
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
  const { studentId } = req.params;

  try {
    const existStudent = await StudentSchema.findById({ _id: studentId });
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
