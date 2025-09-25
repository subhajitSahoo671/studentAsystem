import express from "express";
import {
  addStudent,
  adminLogin,
  adminViewAllStudents,
  deleteStudent,
  takeAttendance,
  UpdateStudent,
} from "../controller/admin.controller.js";
import adminMiddleware from "../middleware/admin.mid.js";
import defaultAttendanceMiddleware from "../middleware/defaultAttendance.mid.js";

const router = express.Router();

router.post("/adminlogin", adminLogin);
router.post("/addstudent", 
  //adminMiddleware, 
  addStudent);
router.get("/viewstudents", adminViewAllStudents);
router.put("/updatestudent/:studentId", 
  //adminMiddleware, 
  UpdateStudent);
router.delete("/deletestudent/:studentId",  
  //adminMiddleware,
  deleteStudent);
router.post("/takeattendance",
  //adminMiddleware, 
  defaultAttendanceMiddleware,
  takeAttendance);

export default router;
