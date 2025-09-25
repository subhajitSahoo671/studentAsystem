import express from 'express'
import { attendance, studentLogin, students, studentSignup } from '../controller/student.controller.js';
import studentMiddleware from '../middleware/student.mid.js';

const router=express.Router();

router.get('/students',students)
router.post('/studentsignup',studentSignup);
router.post('/studentlogin',studentLogin);
router.get('/attendance',attendance);

export default router;