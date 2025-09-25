import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Addstudent from './components/studentInfo/Addstudent';
import Viewstudent from './components/studentInfo/Viewstudent';
import Studentlist from './components/studentInfo/Studentlist';
import Editstudent from './components/studentInfo/Editstudent';
import Payfees from './components/studentfees/Payfees';
import Feeshistory from './components/studentfees/Feeshistory';
import AttendanceReport from './components/attendance/AttendanceReport';
import Attendance from './components/attendance/Attendance';
import Addresult from './components/result/Addresult';
import Viewresult from './components/result/Viewresult';

function App() {
  return (
    <div className='min-h-screen bg-blue-50 '>
      <Navbar />
      <Routes>
        <Route path="/" element={<Addstudent/>} />
        {/* <Route path="/viewstudent/:id" element={<Viewstudent/>} /> */}
        <Route path="/studentlist" element={<Studentlist/>} />
        {/* <Route path='/editstudent/:id' element={<Editstudent/>} /> */}
        <Route path="/payfees" element={<Payfees/>} />
        {/* <Route path="/feeshistory/:id" element={<Feeshistory/>} /> */}
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/attendance-report" element={<AttendanceReport/>} />
        <Route path="/addresult" element={<Addresult/>} />
        <Route path="/viewresult" element={<Viewresult/>} />
      </Routes>
    </div>
  )
}

export default App;
