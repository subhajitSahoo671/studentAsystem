import StudentSchema from "../models/student.model.js";
import { takeattendance } from "../models/takeAttendance.model.js";

const defaultAttendanceMiddleware = async(req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-mm-dd" format
        const existingAttendance = await takeattendance.findOne({ date });

        if (!existingAttendance) {
            const students = await StudentSchema.find({}).select('_id');
            const attendanceRecords = students.map(student => ({
                date,
                stdId: student._id,
                status: null // Default status is null (not marked)
            }));
            await takeattendance.insertMany(attendanceRecords);
        }
         next();

    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
}
export default defaultAttendanceMiddleware;