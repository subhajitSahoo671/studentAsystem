import studentSchema from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import signupSchema from "../models/stdSignup.model.js";
import { AttendanceSchema } from "../models/takeAttendance.model.js";

//view student
export const students = async (req, res) => {
  try {
    const data = await student.find();

    if (!data) {
      console.log("No data found");
      res.status(404).json("student data not found");
    } else {
      console.log("data fetch succesfully");
      res.status(200).json(data);
    }
  } catch (error) {
    console.log("ERROR !! in student controller:", error);
    res.status(500).json("internal server error", error);
  }
};

//student signup
export const studentSignup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (!email || !password || !confirmPassword) {
      console.log("ERROR !! require data not found");
      return res.status(404).json({ error: "required data not found" });
    }

    const isExist1 = await studentSchema.findOne({ email });
    if (isExist1) {
      const isExist2 = await signupSchema.findOne({ email });
      if (isExist2) {
        console.log(
          `ERROR !! user with email ${email} aleardy exist pleas Login`
        );
        return res.status(401).json({
          error: `user with email ${email} aleardy exist pleas Login`,
        });
      }

      if (password !== confirmPassword) {
        console.log("ERROR !! password & confirmPassword must be same");
        return res
          .status(406)
          .json({ error: "password confirmPassword must be same" });
      }

      const hasePassword = await bcrypt.hash(password, 10);
      console.log("hashed");

      const newStd = new signupSchema({
        email,
        password: hasePassword,
      });
      console.log("data wraped");

      const response = await newStd.save();
      console.log("response:", response);

      console.log("Signup succesfully");
      return res.status(200).json({ message: "signup successfully" });
    } else {
      console.log("You are not validate this time");
      return res.status(401).json({ error: "You are not validate this time" });
    }
  } catch (error) {
    console.log("ERROR !! in student signup", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//student login
export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("pleas provid email and password");
      return res.status(404).json({ error: "pleas provid email and password" });
    }

    const user = await studentSchema.findOne({ email });
    if (user) {
      const isExist = await signupSchema.findOne({ email });
      if (!isExist) {
        console.log("ERROR !! user not exist please Signup");
        return res.status(404).json({ error: "user not exist please Signup" });
      }
      const isVerify = await bcrypt.compare(password, isExist.password);
      if (!isExist || isExist === null || !isVerify) {
        console.log("ERROR !! invalid crediential");
        return res.status(400).json({ error: "invalid cradential" });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
          },
          config.JWT_USER_SECRET,
          { expiresIn: "1d" }
        );

        const cookieOptions = {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1d
          httpOnly: true, // its true for secure purpose because(this cookie can't accesable directly thgrow js)
          secure: process.env.NODE_ENV === "production", //true for http only
          domain: "localhost",
          path: "/",
          sameSite: "strict", //privent CSRF attacks
        };
        res.cookie("jwt", token, cookieOptions);
        return res
          .status(201)
          .json({ message: "Login succesfilly", user, token });
      }
    } else {
      console.log("You are not validate this time");
      return res.status(401).json({ error: "You are not validate this time" });
    }
  } catch (error) {
    console.log("ERROR !! in student Login", error);
    res.status(500).json({ error: "internal server error" });
  }
};

//student attendance
export const attendance = async (req, res) => {
  const studentId = req.studentId;

  try {
    const user = await studentSchema.findById(studentId);
    const response = await AttendanceSchema.find({
      year: user.year,
      department: user.department,
    });
      
      
      
    return res.status(200).json({ message: "ok" },response);
  } catch (error) {
    console.log("ERROR !! in student attendance", error);
    res.status(500).json({ error: "internal server error" });
  }
};
