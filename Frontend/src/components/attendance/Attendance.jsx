import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { colomns, AttendanceButtons } from './AttendanceDataTable'
import Selectdepartment from '../Selectdepartment'
//import studentinfo from "../../assets/studentInfo.json"
//import attendance from "../../assets/attendance.json"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Attendance = () => {
      const [filteredStudent, setFilteredStudent] = useState([]);
      const [students, setStudents] = useState([])
      const [alldata, setAlldata] = useState([])
      const [loading, setLoading] = useState(false);
      const [formData, setFormData] = useState({
                    department: "",
                    year: ""
                  });
      //const [updatedAttendance, setUpdatedAttendance] = useState(false);

     const statusChange = (formdata) => {
      //setUpdatedAttendance(true);
      fetchStudents(formdata);
      //filterstudent(formdata);
      
     }

     const listref = React.useRef("");
     
           const showList = (departmentRef) => {
             if(listref.current.classList.contains("hidden")&&
                !departmentRef.current.classList.contains("hidden"))
             {
               listref.current.classList.remove("hidden");
               departmentRef.current.classList.add("hidden");
             }
             // else if(!listref.current.classList.contains("hidden")&&
             //         departmentRef.current.classList.contains("hidden"))
             // {
             //   listref.current.classList.add("hidden");
             //  departmentRef.current.classList.remove("hidden");
             // }
           };
     
           const hideList = () => {
             window.location.reload();
           }

      const fetchStudents = async(formdata) => {
          setLoading(true)
          try {
            const responnse = await axios.get("http://localhost:4000/api/v1/admin/takeattendance");
           if (responnse.data.success) {
           const Alldata = responnse.data.attendanceRecords;
             setAlldata(Alldata);
             //console.log(Alldata);

             if(formdata){
              filterstudent(formdata, Alldata);
              console.log("Filtered after update");
              
              //setUpdatedAttendance(false);
             }
           } else {
             console.error("Error fetching attendance data:", responnse.data.error);
           }
          } catch (error) {
            console.error("Error fetching attendance data:", error);
          }
           finally{
              setLoading(false)
            }
        }
      
       useEffect(() => {
        fetchStudents()
      },[])

       const filterstudent = (formdata, Alldata) => {
         const filteredStudent = (Alldata?Alldata:alldata).filter(std => 
          (std.stdId?.department == formdata.department)&&(std.stdId.year == (formdata.year?formdata.year:std.stdId.year))
         )  
                 if(filteredStudent){
                    const data = filteredStudent.map((std) => ({
                      name: <div className='flex flex-col py-3 md:py-0'><div className='font-semibold text-[15px] md:font-normal md:text-[13.5px]'>{std.stdId.studentName}</div><div className='md:hidden block'>Roll No. - {std.stdId.rollNo}</div></div>,
                      Department: std.stdId.department,
                      Roll_No: std.stdId.rollNo,
                      Action: (<AttendanceButtons status={std.status} Id={std.stdId._id} statusChange={statusChange} formdata={formdata} />) 
                    }))
                    setStudents(data);
                     //console.log(alldata);
                    //setFilteredStudentDep(data)
      }
    }

        const handleChange = (e) => {
          const { name, value } = e.target;
           const formdata = {
            ...formData,
            [name]: value
          };
          setFormData(formdata);
           filterstudent(formdata);
      }

      const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = students.filter(student => 
            student.Roll_No.toLowerCase().includes(searchTerm)
        );
        setFilteredStudent(filteredData);
      };

  return (
   <div className=' flex w-full  h-screen '>

   <Selectdepartment onChange={handleChange}  showList={showList} formData={formData} heading="Manage Attendance"/>

    <div className='w-full lg:w-[80%] p-2 md:p-5 mt-13  overflow-y-scroll lg:block hidden' ref={listref}>

   <div className='sticky top-0 z-1 bg-blue-50 py-3'>
     <div className='flex lg:flex-none'>
      <div  
      onClick={hideList}
      className='lg:hidden text-xl font-extrabold text-teal-900 rounded-full'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
   <div className='text-center w-full '>
    <h3 className='text-xl font-bold'>Manage Attendance</h3>
   </div>
   </div>

   <div className='flex md:flex-row flex-col md:justify-between mt-6 lg:mt-2 md:items-center'>
    <input type="text" placeholder='Search By Roll_No' 
    onChange= {handleFilter}
    className='px-4 py-1 rounded text-sm md:text-[17px] md:border-none border border-gray-300 bg-white md:w-auto w-[200px]'/>
    <p className='text-xl px-1 mt-1 md:mt-0'>
        Mark Students For <span className='font-bold underline '>{new Date().toISOString().split('T')[0]}{" "}</span>
    </p>
    <Link to={"/attendance-report"} className='px-4 py-1 bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] rounded text-white hidden md:block'>Attendance Report</Link>
   </div>
   </div>
   
    <div className='rounded shadow-md overflow-x-auto'>
      <DataTable
        columns={colomns}
        data={filteredStudent.length > 0 ? filteredStudent : students}
        pagination
        responsive
        customStyles={{
          headRow: {
            style: {
              color: 'white',
              backgroundColor: '#508FF7',
              fontSize: '13px',
              fontWeight: 'semi-bold',
              minHeight: '47px',
            },
          },
          rows: {
            style: {
              fontSize: '13px',
            },
          },
        }}
        progressPending={loading}
        />
    </div>

   </div>

   </div>
  )
}

export default Attendance
