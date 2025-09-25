import React from 'react'

function LeftsideInfo({students}) {
  // console.log(students);
  // console.log(typeof(students.DOB));
  
  return (
    <div className='w-full md:w-[28%] flex justify-end md:flex-none md:bg-gradient-to-b md:to-green-100 bg-gradient-to-r from-white  to-blue-400  md:rounded-none rounded-r-full md:shadow-none shadow-md md:mt-0 mt-25'>
      <div className='w-[60%] p-5 md:hidden flex flex-col contain-content '>
       <h3 className='font-bold text-gray-800 text-xl'> {students.studentName}</h3>
       <h3 className='font-semibold text-gray-800 text-lg'>{students.DOB}{" "}</h3>
       <h3 className='font-semibold text-gray-800 text-lg'>{students.gender}</h3>
      </div>
    <div className='w-[40%] md:w-full  md:ml-0 ml-5  md:mr-10 p-5 md:p-7.5 shadow-md bg-gradient-to-b from-white to-amber-50 md:mt-20 rounded-full md:h-[40%] styleFrame'>
        <div  className='border shadow-md flex object-fill rounded-full' >
            <img src={students && students.image.url}
            className='flex object-fill w-full rounded-full' alt="file not found" />
        </div>

        {/* <div className='mt-15 w-[63%]'>
            <h1 className='font-bold text-xl'>Student Information</h1> 
            <ul className='list-disc pt-3 pl-15 text-lg font-semibold text-orange-600' >
                <li className='underline cursor-pointer'>Personal Info</li>
                <li className='underline cursor-pointer'>Parent Info</li>
                <li className='underline cursor-pointer'>Address</li>
                <li className='underline cursor-pointer'>Contact Info</li>
                <li className='underline cursor-pointer'>Department Info</li>
            </ul>
        </div> */}
    </div>
    </div>
  )
}

export default LeftsideInfo
