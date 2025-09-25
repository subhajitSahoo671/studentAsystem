import dotenv from 'dotenv'
dotenv.config();

const JWT_ADMIN_SECRET=process.env.JWT_ADMIN_SECRET;
const JWT_USER_SECRET=process.env.JWT_USER_SECRET;

export default {JWT_ADMIN_SECRET,JWT_USER_SECRET};