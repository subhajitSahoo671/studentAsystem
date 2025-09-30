import React, { useState } from 'react'

function Selectdepartment({onChange,showList,formData,heading}) {
    // const [department, setDepartment] = useState()
    // const [year, setYear] = useState()
    // const [filteredStudentDep, setFilteredStudentDep] = useState()

  //  const handleSubmit = (e) => {
  //   e.preventDefault();
  //    const filteredStudent = students.filter((std) => (std.department == department)&&(std.year == year) )
  //    setFilteredStudentDep(filteredStudent)
  //  }
//console.log(formData);

  const departmentRef = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault()
    showList(departmentRef)
    //departmentRef.current.classList.add("hidden");

  }

   const handleChange = (e) => {
     onChange(e);
   };
     
  return (
           <form 
    onSubmit={(e) => {handleSubmit(e)}}
    className='lg:w-[20%] border-2 w-full px-10 py-20  bg-gradient-to-br from-[#de5ade] to-[#2a97e6] h-screen text-white shadow-lg overflow-hidden lg:block' ref={departmentRef}>

      <h3 className='lg:hidden w-full text-center text-2xl font-bold'>{heading}</h3>

      <div className='flex flex-col gap-3 mb-10 mt-20'>
        <label className='lg:text-xl text-2xl' htmlFor="Department">Select Department</label>
        <select name="department" id="Department" 
        required
       value={formData.department}
        onChange={(e) => handleChange(e)}
        className='bg-[#46bce0] text-white text-lg py-1 px-4 w-[80%] rounded outline-none'>
            <option value={""}>Department</option>
            <option>BCA</option>
            <option>BBA</option>
            <option>BBT</option>
            <option>BTECH</option>
        </select>
      </div>

      <div className='flex flex-col gap-3 mb-20'>
        <label className='lg:text-xl text-2xl' htmlFor="Year">Select Year</label>
        <select name="year" id="Year"
        value={formData.year}
        onChange={(e) => handleChange(e)}
        className='bg-[#56c2e2] text-white text-lg py-1 px-4 w-[80%] rounded outline-none'>
            <option value={""}>Year</option>
            <option value={1}>1st Year</option>
            <option value={2}>2nd Year</option>
            <option value={3}>3rd Year</option>
            {
              formData.department === "BTECH" && (
                <option value={4}>4th Year</option>
              )
            }
        </select>
      </div>

      <div className='flex justify-center mt-5 lg:hidden'>
        <button className='bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] border-t border-l shadow-lg text-white text-lg py-1 px-4 rounded-md font-semibold cursor-pointer'>Submit</button>
      </div>

    </form>
  )
}

export default Selectdepartment
