import React, { useEffect, useState } from 'react'
//import { useParams } from 'react-router-dom'
//import studentinfo from "../../assets/studentInfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Editstudent({id, onClose}) {
      
  //const {id} = useParams()
  const [loading, setLoading] = useState("")
  const [students, setStudents] = useState("")
  
  const [studentName, setstudentName] = useState("")
  const [DOB, setDOB] = useState("")
  const [image, setImage] = useState("") // Assuming you will handle image upload separately
  const [rollNo, setrollNo] = useState("")
  const [parentName, setparentName] = useState("")
  const [parentPhoneNo, setparentPhoneNo] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")


  useEffect(() => {
    const fetchStudents = async() => {
      setLoading(true)
      try {
       const responnse = await axios.get("http://localhost:4000/api/v1/admin/viewstudents");
        if(responnse){
          const std=responnse.data.find(student=> student._id == id)
          setStudents(std)
          setstudentName(std.studentName); 
          setDOB(std.DOB); 
          setImage(std.image);
          setrollNo(std.rollNo);
          setparentName(std.parentName);
          setparentPhoneNo(std.parentPhoneNo);
          setCity(std.city);
          setState(std.state);
          setEmail(std.email);
          setPhoneNo(std.phoneNo);
          setDepartment(std.department);
          setYear(std.year);
        }
      } catch (error) {
         if(!responnse){
              alert(error)
            }
      }
      finally{
              setLoading(false)
            }
    }
    fetchStudents()
  },[])

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
     const formData = new FormData();
  formData.append("studentName", studentName);
  formData.append("DOB", DOB);
  formData.append("image", image); // This must be a File object
  formData.append("rollNo", rollNo);
  //formData.append("gender", gender);
  formData.append("parentName", parentName);
  formData.append("parentPhoneNo", parentPhoneNo);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("email", email);
  formData.append("phoneNo", phoneNo);
  formData.append("department", department);
  formData.append("year", year);
    formData && console.log("Student Data Submitted: ", formData);
   // studentData && alert("Student Data updatted");
    try {
      const responnse = await axios.put(`http://localhost:4000/api/v1/admin/updatestudent/${id}`,formData,
        {
                            //    headers: {
                    //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                    //    }
                    headers: {
                  "Content-Type": "multipart/form-data",
               },
      }
    );
      if(responnse.status==200){
        alert(responnse.data.message)
      }else{
        alert(responnse.data.error)
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
    setstudentName("");
    setDOB(""); 
    setImage("");
    setrollNo("");
    setparentName("");
    setparentPhoneNo("");
    setCity("");
    setState("");
    setEmail("");
    setPhoneNo("");
    setDepartment("");
    setYear("");
  }

  return (
    <div className='z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center '>

  <div className='h-full md:pt-3 py-5 bg-blue-50 md:w-[80%]'>
         
     {
     loading ? (
      <p>Loading.....</p>
    ) : (
       <form 
  onSubmit={(e)=> {
    handleSubmit(e);
  }} 
  className=' px-5 md:px-10 bg-gradient-to-b from-amber-50 to-teal-100 h-full shadow-lg rounded-lg mt-13 overflow-y-scroll'>

    <div className='flex justify-center items-center'>
     <div>
          <button 
        onClick={onClose}
        className=' cursor-pointer text-xl font-extrabold text-black rounded-full 
         hover:text-blue-700'>
          <FontAwesomeIcon icon={faArrowLeft} /></button>
    </div>
     <div className='text-center w-full'>
           <h3 className='text-xl md:text-2xl font-semibold md:font-medium pt-1 md:pt-3'>Edit Student Information</h3>
     </div>
    </div>

    <h1 className='mt-2 md:mt-6 text-lg md:text-lg'>Student Information</h1>

    <div className='flex lg:flex-row flex-col justify-between mt-2 w-full'>

     <div className='flex md:flex-row flex-col justify-between w-full lg:w-[50%]'>
       <input type="text" placeholder='Full Name' 
      required
      value={studentName}
      onChange={(e) => setstudentName(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full  py-1 px-4 rounded-md mr-3 md:mt-2 md:mb-0 mb-3 '/>
      <input type="date" placeholder='Date of Birth' 
      required
      value={DOB}
      onChange={(e) => setDOB(e.target.value)}
      className='bg-gradient-to-r from-white to-teal-200 border outline-none border-gray-300 w-full  py-1 px-4 rounded-md lg:mr-3 md:mt-2 md:ml-3 md:mb-0 mb-3'/>
     </div>

      <div className='flex md:flex-row flex-col justify-between w-full lg:w-[50%]'>
        <input type="file" placeholder='image' 
      required
      accept='image/*'
      onChange={(e) => setImage(e.target.files[0])}
      className="lg:file-input file-input-accent lg:font-normal font-semibold lg:bg-white bg-teal-400 border outline-none lg:p-1 py-1 px-4 rounded-md md:mr-3 lg:mx-3 mb-3 w-full lg:w-[50%] md:mt-2 md:mb-0 border-none" />
      <input type="text" placeholder='Registration No.' 
      required
      value={rollNo}
      onChange={(e) => setrollNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full lg:w-[50%]  py-1 px-4 rounded-md  md:mt-2 md:ml-3 md:mb-0 '/>
      </div>
      
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Parent Information</h1>

    <div className='flex justify-between w-full'>
      <input type="text" placeholder='Father/Mother Name' 
      required
      value={parentName}
      onChange={(e) => setparentName(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 mr-3 '/>
      <input type="number" placeholder='Parent Phone Number' 
      minLength={10} 
      required
      value={parentPhoneNo}
      onChange={(e) => setparentPhoneNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 md:ml-3'/>
    </div>
    
    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Address</h1>

    <div className='flex md:flex-row flex-col justify-between mt-2 w-full'>
      <input type="text" placeholder='City' 
      required
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/2 py-1 px-4 rounded-md md:mb-0 mb-3 md:mt-2 mr-3'/>
      <input type="text" placeholder='State' 
      required
      value={state}
      onChange={(e) => setState(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/2 py-1 px-4 rounded-md  md:mt-2 md:ml-3'/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Contact Information</h1>

    <div className='flex justify-between w-full'>
      <input type="email" placeholder='Email' 
      minLength={10}
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-2  mr-3 '/>
      <input type="number" placeholder='Phone Number' 
      required
      value={phoneNo}
      onChange={(e) => setPhoneNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-2  ml-3'/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg'>Department Information</h1>

     <div className='flex md:flex-row flex-col justify-between w-full pb-3  md:mb-5'>

    <div className='w-full lg:w-1/3'>
      <div className='flex mb-1 '>
      <label htmlFor="department" className='flex pt-2 md:pt-3'>Department</label>
      <select name="department" id='department'
        required
       value={department}
        onChange={(e) => setDepartment(e.target.value)} 
       className='bg-gray-50 border outline-none border-gray-300 w-full mt-2 md:mt-2 py-1 px-4 rounded-md ml-3 '>
        <option value={""}>Department</option>
        <option>BCA</option>
        <option>BBA</option>
        <option>BBT</option>
        <option value="BTECH">BTECH</option>
      </select>
    </div>

    <div className='flex '>
      <label htmlFor="Year" className='flex pt-2 md:pt-3'>Year</label>
      <select name="Year" id='Year' 
      required
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full mt-2 md:mt-2 py-1 px-4 rounded-md ml-8 '>
        <option value={""}>Year</option>
        <option value={1}>1st Year</option>
        <option value={2}>2st Year</option>
        <option value={3}>3st Year</option>
        {department === "BTECH" && (
          <option value={4}>4th Year</option>
        )}
      </select>
    </div>

   </div>

     <div className='flex justify-center items-end mt-5 md:ml-3 w-full md:w-[30%] lg:w-[20%]'>
      <button className='border px-4 py-1.5 rounded-lg cursor-pointer bg-teal-600 text-white text-lg font-semibold md:font-bold w-full ml-6 mb-6' >Edit Student</button>
    </div>

     </div>
     
  </form>
    )
   }

  </div>

   </div>
  )
}

export default Editstudent

