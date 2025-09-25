import axios from 'axios'
import React, { useState } from 'react'

function Addstudent() {
      
  const [studentName, setstudentName] = useState("")
  const [DOB, setDOB] = useState("")
  const [image, setImage] = useState("") // Assuming you will handle image upload separately
  const [rollNo, setrollNo] = useState("")
  const [gender, setGender] = useState("")
  const [parentName, setparentName] = useState("")
  const [parentPhoneNo, setparentPhoneNo] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  // const [country, setCountry] = useState("")
  // const [zipcode, setZipcode] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setphoneNo] = useState("")
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
   const formData = new FormData();
  formData.append("studentName", studentName);
  formData.append("DOB", DOB);
  formData.append("image", image); // This must be a File object
  formData.append("rollNo", rollNo);
  formData.append("gender", gender);
  formData.append("parentName", parentName);
  formData.append("parentPhoneNo", parentPhoneNo);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("email", email);
  formData.append("phoneNo", phoneNo);
  formData.append("department", department);
  formData.append("year", year);

    formData && console.log("Student Data Submitted: ", formData);
    // formData && alert("Student Data Submitted");
    try {
      const responnse = await axios.post("http://localhost:4000/api/v1/admin/addstudent",formData,
        {
                            //    headers: {
                    //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                    //    }
                    headers: {
                  "Content-Type": "multipart/form-data",
               },
      }
    );
      if(responnse.status==201){
        alert(responnse.data.message)
      }else{
        alert(responnse.data.error)
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
    setstudentName("");
    setDOB(""); 
    setImage("");
    setrollNo("");
    setGender("");
    setparentName("");
    setparentPhoneNo("");
    setCity("");
    setState("");
    // setCountry("");
    // setZipcode("");
    setEmail("");
    setphoneNo("");
    setDepartment("");
    setYear("");
  }
  return (
    <div className='bg-gradient-to-b from-amber-50 to-teal-100 h-full lg:h-screen '>
  <form 
  onSubmit={(e)=> {
    handleSubmit(e);
  }} 
  className='px-5 md:px-15 '>

    <div className='flex justify-center '>
      <h3 className='text-xl md:text-2xl font-semibold md:font-bold pt-1 md:pt-3 mt-15'>Student Registration Form</h3>
    </div>

    <h1 className='mt-2 md:mt-6 text-lg md:text-lg font-semibold text-gray-800'>Student Information</h1>

    <div className='flex md:flex-row flex-col justify-between  mt-1 md:mt-2 w-full'>
      <input type="text" placeholder='Full Name' 
      required
      value={studentName}
      onChange={(e) => setstudentName(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:mt-2 md:mb-0 mb-3'/>
      <input type="date" placeholder='Date of Birth' 
      required
      value={DOB}
      onChange={(e) => setDOB(e.target.value)}
      className='bg-gradient-to-r from-white to-teal-200 border outline-none border-gray-300 text-gray-800 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:mt-2 md:ml-3 md:mb-0 mb-3 block '/>
      <input type="file" placeholder='image' 
      required
      //value={image}
      onChange={(e) => setImage(e.target.files[0])}
      className="file-input file-input-accent  bg-white md:mx-3 mb-3 w-full md:w-1/4 md:mt-2 md:mb-0 p-1 md:p-0 "/>
      <input type="text" placeholder='Registration/Roll No.' 
      required
      value={rollNo}
      onChange={(e) => setrollNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/3 py-1 px-4 rounded-md mr-3 md:ml-3 md:mt-2 md:mb-0 mb-3 '/>
      <select name="gender" placeholder="Gender" 
      required
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 py-1 w-1/3 md:w-1/10 rounded-md md:ml-3 md:mt-2'>
        <option value="">Gender</option>
        <option>male</option>
        <option>female</option>
      </select>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg font-semibold text-gray-800'>Parent Information</h1>

    <div className='flex justify-between w-full'>
      <input type="text" placeholder='Father/Mother Name' 
      required
      value={parentName}
      onChange={(e) => setparentName(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 mr-3 '/>
      <input type="number" placeholder='Parent phoneNo Number' 
      minLength={10} 
      required
      value={parentPhoneNo}
      onChange={(e) => setparentPhoneNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 md:ml-3'/>
    </div>
    
    <h1 className='mt-3 md:mt-7 text-lg md:text-lg font-semibold text-gray-800'>Address</h1>

    <div className='flex flex-col md:flex-row justify-between mt-2 w-full'>
      <input type="text" placeholder='Village/City' 
      required
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/2 py-1 px-4 rounded-md md:mb-0 mb-3 md:mt-2 mr-3'/>
      <input type="text" placeholder='State/Country' 
      required
      value={state}
      onChange={(e) => setState(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-full md:w-1/2 py-1 px-4 rounded-md  md:mt-2 md:ml-3'/>
    </div>

    {/* <div className='flex justify-between mt-2 w-full'>
      <input type="text" placeholder='Country' 
      required
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 mr-3 '/>
      <input type="number" placeholder='Zip Code' 
      required
      value={zipcode}
      onChange={(e) => setZipcode(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 md:ml-3 '/>
    </div> */}

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg font-semibold text-gray-800'>Contact Information</h1>

    <div className='flex justify-between w-full'>
      <input type="email" placeholder='Email' 
      minLength={10}
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 mr-3 '/>
      <input type="number" placeholder='phoneNo Number' 
      required
      value={phoneNo}
      onChange={(e) => setphoneNo(e.target.value)}
      className='bg-gray-50 border outline-none border-gray-300 w-1/2 py-1 px-4 rounded-md mt-1 md:mt-2 ml-3 '/>
    </div>

    <h1 className='mt-3 md:mt-7 text-lg md:text-lg font-semibold text-gray-800'>Department Information</h1>

     <div className='flex md:flex-row flex-col justify-between w-full'>

    <div className='w-full md:w-1/5'>
      <div className='flex  '>
      <label htmlFor="department" className='flex pt-2 md:pt-3'>Department</label>
      <select name="department" id='department'
        required
       value={department}
        onChange={(e) => setDepartment(e.target.value)} 
       className='bg-gray-50 border outline-none border-gray-300 w-full mt-2 md:mt-3 py-1 px-4 rounded-md ml-3 '>
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
      className='bg-gray-50 border outline-none border-gray-300 w-full mt-2 md:mt-3 py-1 px-4 rounded-md ml-8 '>
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

    <div className='flex justify-center items-end mt-5 md:ml-3 w-full md:w-[10%]'>
      <button className='border px-4 py-1.5 rounded-lg cursor-pointer bg-gradient-to-br from-teal-400 to-[#5fb4f0] text-white text-lg font-semibold md:font-bold md:mb-0 mb-1 w-full' >Add Student</button>
    </div>

     </div>
     
  </form>
    </div>
  )
}

export default Addstudent
