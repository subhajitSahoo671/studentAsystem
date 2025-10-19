import express from "express";
import {
  addresult,
  addStudent,
  adminLogin,
  adminViewAllStudents,
  attendanceReport,
  deleteStudent,
  feesRecord,
  markAttendance,
  Payfees,
  takeAttendance,
  UpdateStudent,
  Viewresult,
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
router.delete("/deletestudent/:Id",  
  //adminMiddleware,
  deleteStudent);
router.get("/takeattendance",
  //adminMiddleware, 
  defaultAttendanceMiddleware,
  takeAttendance);
router.put("/markAttendance/:Id",
  //adminMiddleware, 
  markAttendance);
router.get("/attendanceReport",
  //adminMiddleware, 
  attendanceReport
);
router.post("/addresult",
  //adminMiddleware,
  addresult);
router.get("/Viewresult",
  //adminMiddleware, 
  Viewresult
);
router.post("/payfees/:Id",
  //adminMiddleware,
  Payfees
);
router.get("/feesRecord/:Id",
  //adminMiddleware,
  feesRecord
)

export default router;
