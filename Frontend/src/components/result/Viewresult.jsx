import React, { use, useEffect, useState } from 'react'
import attendance from "../../assets/attendance.json"


function Viewresult() {
    const [report, setReport] = useState(null);
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dateFilter, setDateFilter] = useState();

    const fetchReport =  () => {
      try {
            const responnse = attendance;            
        if (responnse) {
            setReport(responnse);
         }
      } catch (error) {
        alert("Error fetching report: " + error.message);
      }
    }

    useEffect(() => {
      fetchReport();
    }, []);

  return (
    <div>
      <h2 className='text-center text-2xl font-bold'>Attendance Report</h2>
      <div>
        <h2 className='text-xl font-semibold'>Filter by Date</h2>
        <input type="date" className='border border-gray-100 rounded-md' />
      </div>
      {/* {
        report.map(date, record)
      } */}
      <table  className='w-full mt-5'>
          <thead>
            <tr>
              <th>S No</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {report && report.map((record, index) => (
              <tr key={record.rollNo}>
                <td>{index + 1}</td>
                <td>{record.fullName}</td>
                <td>{record.rollNo}</td>
                <td>{record.department}</td>
                <td>{record.status ? record.status : "Not Marked"}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default Viewresult
