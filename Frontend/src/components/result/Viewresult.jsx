import React, { use, useEffect, useState } from 'react'
//import attendance from "../../assets/attendance.json"
import axios from 'axios';


function Viewresult() {
    const [report, setReport] = useState({});
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
   // const [dateFilter, setDateFilter] = useState();

    const fetchReport = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({ limit, skip }).toString();
       
        const response = await axios.get(`http://localhost:4000/api/v1/admin/Viewresult?${queryParams}`
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
         console.error("Error fetching report: ", error);
        //alert("Error fetching report: " + error.response.data.error);  
        
      }
    }

    useEffect(() => {
      fetchReport();
    }, [skip]);

    const handleLoadMore = () => {
      setSkip((prevSkip) => prevSkip + limit);
      //fetchReport();
    }
  return (
    <div className='w-full min-h-screen px-3 md:px-15 py-5'> 
     <div className='sticky top-3 z-1 bg-blue-50 py-3 '>
       <h2 className='text-center text-xl md:text-2xl font-bold pt-10 md:pt-13'>Result Report</h2>
      <div className='flex justify-baseline items-center  mt-5 px-1 md:px-3 space-x-1 md:space-x-2 '>
        <h2 className=' font-medium text-gray-800'>Search by Exam:</h2>
        <input type="text" placeholder='Enter Exam Name'
        onChange={(e) => {
          setDateFilter(e.target.value);
          setSkip(0);
        }}
        className='border border-gray-300 bg-white rounded-md px-3 py-[3px]' />
      </div>
     </div>
      {loading ? <p>Loading...</p> :
     <div>
      {
      Object.entries(report).map(([Exam, records]) => (
          <div key={Exam} className='my-2 p-3 md:p-5 border border-gray-300 rounded-md shadow-md  w-fit text-amber-50  bg-gradient-to-br from-[#da5fda] via-[#43A9DD] to-[#2a97e6] '>
            <h3 className='px-3 text-white'><span className='font-bold '>Exam: </span>{Exam}</h3>

           <table  className=' mt-2' border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr >
              <th className='px-5 md:px-10 lg:px-13 py-1.5 hidden md:block'>SL No</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5'>Roll No</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5 hidden lg:block'>Name</th>
              <th className='px-5 md:px-10 lg:px-13 py-1.5 '>Total Mark</th>
              <th className='pl-7 pr-5 md:px-10 lg:px-13 py-1.5'>Accured Mark</th>
            </tr>
          </thead>
          <tbody>
            {records && records.map((data, i) => (
              <tr key={data.studentId._id} className=' odd:bg-amber-50 odd:text-[#da5fda]'>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 hidden md:block'>{i + 1}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 md:rounded-none rounded-l-md'>{data.studentId.rollNo}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 hidden lg:block'>{data.studentId.studentName}</td>
                <td className='px-5 md:px-10 lg:px-13 py-1.5 '>{data.marks.totalMark}</td>
                <td className='pl-7 pr-5 md:px-10 lg:px-13 py-1.5 rounded-r-md'>{data.marks.accuredMark}</td>
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

export default Viewresult
