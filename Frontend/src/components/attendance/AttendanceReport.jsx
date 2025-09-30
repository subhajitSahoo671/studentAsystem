import React, { use, useEffect, useState } from 'react'
//import attendance from "../../assets/attendance.json"
import axios from 'axios';


function AttendanceReport() {
    const [report, setReport] = useState({});
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dateFilter, setDateFilter] = useState();

    const fetchReport = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ limit, skip });
        if (dateFilter) {
          queryParams.append('date', dateFilter);
        }
        const response = await axios.get(`http://localhost:4000/api/v1/admin/attendanceReport?${queryParams.toString()}`
        // ,  {
        //   // headers: {
        //   //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   // },
        // }
      );
       // console.log(response);
        if (response.data.success) {
           if(skip === 0){
            setReport( response.data.groupedRecords);
            console.log(response.data);
            
           }else{
            setReport((prevRecords) => ({...prevRecords, ...response.data.groupedRecords}));
           }
         }
         else {
          console.error("Error fetching report:", response.data.error);
         }
        setLoading(false);
      } catch (error) {
        alert("Error fetching report: " + error.response.data.error);
        console.error("Error fetching report: ", error);
        
      }
    }

    useEffect(() => {
      fetchReport();
    }, [skip, dateFilter]);

    const handleLoadMore = () => {
      setSkip((prevSkip) => prevSkip + limit);
      //fetchReport();
    }
  return (
    <div className='w-full min-h-screen px-5 md:px-15 py-5'> 
      <h2 className='text-center text-xl md:text-2xl font-bold pt-10 md:pt-13'>Attendance Report</h2>
      <div className='flex justify-baseline items-center  mt-5 px-1 md:px-3 space-x-1 md:space-x-2 '>
        <h2 className=' font-medium text-gray-800'>Filter by Date:</h2>
        <input type="date" 
        onChange={(e) => {
          setDateFilter(e.target.value);
          setSkip(0);
        }}
        className='border border-gray-300 bg-gradient-to-r from-white to-[#72a8ff] rounded-md px-3 py-[3px]' />
      </div>
      {loading ? <p>Loading...</p> :
     <div>
      {
      Object.entries(report).map(([date, records]) => (
          <div key={date} className='my-5 p-3 md:p-5 border border-gray-300 rounded-md shadow-md  w-fit text-amber-50  bg-gradient-to-br from-[#da5fda] via-[#43A9DD] to-[#2a97e6] '>
            <h3 className='px-3 text-white'><span className='font-bold '>Date: </span>{date}</h3>

           <table  className=' mt-2' border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th className='px-5 md:px-10 lg:px-13 py-1.5'>SL No</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5 hidden md:block'>Name</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5'>Roll No</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5 hidden lg:block'>Department</th>
              <th className='pl-8 pr-5 md:px-10 lg:px-13 py-1.5'>Status</th>
            </tr>
          </thead>
          <tbody>
            {records && records.map((data, i) => (
              <tr key={data.stdId._id}>
                <td className='px-5 md:px-10 lg:px-13 py-1.5'>{i + 1}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 hidden md:block'>{data.stdId.studentName}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5'>{data.stdId.rollNo}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 hidden lg:block'>{data.stdId.department}</td>
                <td className='pl-8 pr-5 md:px-10 lg:px-13 py-1.5'>{data.status ? data.status : "Not Marked"}</td>
              </tr>
            ))}
          </tbody>
      </table>

          </div>
        ))
      }
             <button 
              className='bg-[#508FF7] px-3 md:px-4 py-1 md:py-2 cursor-pointer rounded-md font-semibold mt-5 text-white hover:bg-[#2a97e6] mx-3'
              onClick={handleLoadMore}
              >
                Load More
              </button>
      </div>
      }
    </div>
  )
}

export default AttendanceReport
