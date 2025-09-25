import React from 'react'

function RightsideInfo({students}) {
  return (
    <>
    <div className='w-full md:w-[72%] md:px-9 p-6 md:py-8.5 shadow-lg bg-gradient-to-b from-white to-blue-400 overflow-auto mt-10 md:mt-15 '>
      <div className='bg-gray-50 border px-3 md:px-6 py-1 flex flex-col '>

        <div className='hidden md:block'>
      <h3 className='text-lg md:text-xl font-bold text-blue-400 '>
        Personal Information
      </h3>

     <div className='p-3 flex justify-between mb-2'>

    <div>
       <h3 className=' text-gray-800 font-semibold '>
        Student Name
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.studentName}
      </h1>
    </div>

      <div>
        <h3 className=' text-gray-800 font-semibold '>
        Date Of Birth
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.DOB}
      </h1>
      </div>

      <div>
        <h3 className=' text-gray-800 font-semibold '>
        Reg/Roll Number
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.rollNo}
      </h1>
      </div>

      <div>
        <h3 className=' text-gray-800 font-semibold '>
        Gender
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.gender}
      </h1>
      </div>

     </div>
      <hr />
      </div>
     

         <div className='md:order-none order-last'>
      <h3 className='text-xl font-bold text-blue-400 '>
        Parent Information
      </h3>

     <div className='p-3 flex md:flex-row flex-col justify-around mb-2'>

    <div>
       <h3 className=' text-gray-800 font-semibold '>
        Father/Mother Name
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
       {students.parentName}
      </h1>
    </div>

      <div>
        <h3 className=' text-gray-800 font-semibold md:pt-0 pt-3'>
        Parent Phone Number
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.parentPhoneNo}
      </h1>
      </div>

     </div>
      <hr className='md:block hidden'/>
      </div>
      
         <div>
      <h3 className='text-xl font-bold text-blue-400 '>
        Contact Information
      </h3>

     <div className='p-3 flex md:flex-row flex-col justify-around mb-2'>

    <div>
       <h3 className=' text-gray-800 font-semibold '>
        Email Address
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.email}
      </h1>
    </div>

      <div>
        <h3 className=' text-gray-800 font-semibold md:pt-0 pt-3'>
        Std Phone Number
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
       {students.phoneNo}
      </h1>
      </div>

     </div>
      <hr />
      </div>

         <div>
      <h3 className='text-xl font-bold text-blue-400 '>
        Address
      </h3>

     <div className='p-3 flex justify-between md:justify-around mb-2'>

    <div>
       <h3 className=' text-gray-800 font-semibold '>
        Village/City
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.city}
      </h1>
    </div>

      <div>
        <h3 className=' text-gray-800 font-semibold '>
        State
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.state}
      </h1>
      </div>

     </div>
      <hr />
      </div>      

        <div className='md:order-none order-first'>
      <h3 className='text-xl font-bold text-blue-400 '>
        Department Information
      </h3>

     <div className='md:flex flex-col'>

   <div className='p-3 flex md:justify-around justify-between'>
     <div>
       <h3 className=' text-gray-800 font-semibold '>
        Department
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.department}
      </h1>
    </div>

      <div>
        <h3 className=' text-gray-800 font-semibold '>
        Year
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
       {students.year}
      </h1>
      </div>
   </div>

       <div className='md:hidden block p-3 pt-0 '>
        <h3 className=' text-gray-800 font-semibold '>
        Reg/Roll Number
      </h3>
      <h1 className='text-lg font-bold text-gray-800 contain-content'>
        {students.rollNo}
      </h1>
      </div>

     </div>
     <hr className='md:hidden block'/>
      </div>

      </div>
    </div>
    </>
  )
}

export default RightsideInfo