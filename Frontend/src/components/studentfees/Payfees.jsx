import React, { useEffect, useState } from 'react'
import studentinfo from "../../assets/studentInfo.json"

function Payfees() {
      
  const [studentlist, setStudentlist] = useState([])
  const [loading, setLoading] = useState("")

  const [studentname, setStudentname] = useState("")
  const [date, setDate] = useState("")
  const [fees, setFees] = useState("")
  const [regno, setRegno] = useState("")
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
      const fetchStudents = () => {
      setLoading(true)
      try {
        const responnse = studentinfo;
        if(responnse){
          const stdlist=responnse.filter(std => (std.department == department)&&(std.year == year))
          setStudentlist(stdlist)
        }
      } catch (error) {
        alert(error)
      }
      finally{
              setLoading(false)
            }
    }
    fetchStudents()
  },[department,year])

  const handleSelectName = (e) => {
    const selectedName = e.target.value;
    const selectedStudent = studentlist.find(std => std.fullName === selectedName);
    
    if (selectedStudent) {
      setRegno(selectedStudent.rollNo);
    } else {
      setRegno("");
    }
    
    setStudentname(selectedName);
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      studentname,
      date,
      regno,
      fees,
      department,
      year,
    }
    studentData && console.log("Student Data Submitted: ", studentData);
    setStudentname("");
    setDate(""); 
    setRegno("");
    setFees("");
    setDepartment("");
    setYear("");
  }
  return (
  <div className='h-full px-3 md:px-25 lg:px-50 py-10 lg:py-15 bg-blue-50'>
    {
      loading?(
        <p>Loading.....</p>
      ):(
          <form 
  onSubmit={(e)=> {
    handleSubmit(e);
  }} 
  className='px-5 md:px-10 bg-gradient-to-b from-amber-50 to-teal-100 h-full shadow-lg rounded-lg mt-15'>

    <div className='flex justify-center items-center '>
      <h3 className='text-xl md:text-2xl font-semibold md:font-medium pt-3 md:pt-10 mb-5 md:mb-10'>Pay Coursse Fees</h3>
    </div>

    <div className='flex w-full justify-between mb-3'>
      <div className='w-[50%] mr-3'>
      <label htmlFor="department" className=' pt-2 md:pt-3 '>Department</label>
      <select name="department" id='department'
        required
       value={department}
        onChange={(e) => setDepartment(e.target.value)} 
       className='bg-gray-50 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'>
        <option selected value={""}>{window.innerWidth > 768 ? "Select Department": "Select Dep." }</option>
        <option>BCA</option>
        <option>BBA</option>
        <option>BBT</option>
        <option>BTECH</option>
      </select>
    </div>

    <div className='w-[50%] md:ml-3'>
      <label htmlFor="Year" className=' pt-2 md:pt-3 '>Year</label>
      <select name="Year" id='Year' 
      required
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className='bg-gray-50 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'>
        <option selected value={""}>Select Year</option>
        <option value={1}>1st Year</option>
        <option value={2}>2nd Year</option>
        <option value={3}>3rd Year</option>
        {department === "BTECH" && (
          <option value={4}>4th Year</option>
        )}
      </select>
      </div>
   </div>

    <div className='flex md:flex-row flex-col justify-between mb-3 w-full'>      
      <div className='flex flex-col w-full md:w-[50%] mr-3 mb-3 md:mb-0'>
      <label htmlFor="FullName" className=' pt-2 md:pt-3'>Full Name</label>
      <select name="FullName" id='FullName' 
      required
      value={studentname}
      onChange={(e) => handleSelectName(e)}
      className='bg-gray-50 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'>
        <option selected value={""}>Select name</option>
        {
          studentlist.map((std) => (
          <option key={std.rollNo} value={std.fullName}>
             {std.fullName}
          </option>
              ))
        }
      </select>
      </div>

      <div className='flex flex-col w-full md:w-[50%] md:ml-3'>
      <label htmlFor="Registration/Roll No." className=' pt-2 md:pt-3 '>Student Registration/Roll No.</label>
      <input type="text" placeholder='Registration/Roll No.' 
      required
      value={regno}
      onChange={(e) => setRegno(e.target.value)}
      className='bg-gray-50 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'/>
      </div>
    </div>

    <div className='flex justify-between mb-3 w-full'>
      <div className='flex flex-col w-[50%] mr-3'>
        <label htmlFor="Pay Fees" className=' pt-2 md:pt-3 '>Pay Fees</label>
        <input type="text" placeholder='Amount' 
      required
      value={fees}
      onChange={(e) => setFees(e.target.value)}
      className='bg-gray-50 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'/>
      </div>

     <div className='flex flex-col w-[50%] md:ml-3'>
      <label htmlFor="Pay Date" className=' pt-2 md:pt-3 '>Pay Date</label>
      <input type="date"  
      required
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className='bg-gradient-to-r from-white to-teal-100 w-full mt-1 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[17px] md:text-lg font-light'/>
     </div>
    </div>

     <div className='flex justify-center items-center w-full mt-10 pb-10'>
      <button className='border px-4 py-2 rounded-lg cursor-pointer bg-teal-600 text-white w-full md:w-[50%] text-lg font-semibold' >Pay Fees</button>
    </div>

    
     
  </form>

      )
    }
  </div>
  )
}

export default Payfees
