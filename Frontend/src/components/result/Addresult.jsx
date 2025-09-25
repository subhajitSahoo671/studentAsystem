import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { colomns, StdMarkInputs  } from './ResultDataTable'
import Selectdepartment from '../Selectdepartment'
import studentinfo from "../../assets/studentInfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Addresult = () => {
      const [students, setStudents] = useState([])
      const [alldata, setAlldata] = useState([])
      const [loading, setLoading] = useState(false)
      const [filteredStudent, setFilteredStudent] = useState([]);
      const [formData, setFormData] = useState({
              department: "",
              year: ""
            });
      const [Exam, setExam] = useState("")
      const [totalMark, setTotalMark] = useState("")

     const [marksMap, setMarksMap] = useState({}); // { [rollNo]: accuredMark }
     
      const listref = useRef("");
      const totalMarksubmitref = useRef("")
      const totalMarklabelref = useRef("")
      const examtypelabelref = useRef("")
      const totalMarkinputref = createRef()
      const examtypeinputref = createRef()

    const handleAccuredMarkChange = (rollNo, accuredMark, totalMark) => {
      setMarksMap(prev => ({
        ...prev,
        [rollNo]: { accuredMark, totalMark, Exam }
      }));
    };
    
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

      useEffect(() => {
        const fetchStudents = () => {
          setLoading(true)
          try {
            const responnse = studentinfo;
            setAlldata(responnse)
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

      const filterstudent = (formdata) => {
         const filteredStudent = alldata.filter(std => (std.department == formdata.department)&&(std.year == (formdata.year?formdata.year:std.year)))  
           if(filteredStudent){
              const data = filteredStudent.map((std) => ({
                name: <div className='flex flex-col py-3 md:py-0'><div className='font-semibold text-[15px] md:font-normal md:text-[13.5px]'>{std.fullName}</div><div className='md:hidden block'>Roll No. - {std.rollNo}</div></div>,
                Department: std.department,
                Roll_No: std.rollNo,
                Marks: (<StdMarkInputs Id={std.rollNo} onAccuredMarkChange={handleAccuredMarkChange} totalMark = {totalMark} />) 
              }))
              
              setStudents(data)
              //setFilteredStudentDep(data)
            }
      }

       const handleChange = (e) => {
         // e.preventDefault();
          const { name, value } = e.target;
           const formdata = {
            ...formData,
            [name]: value
          };
          setFormData(formdata);
           filterstudent(formdata)
           setMarksMap({})
           setExam("")
           setTotalMark("")
         }

         const handleTotalMark = (e) => {
           e.preventDefault();
           filterstudent(formData);
           totalMarksubmitref.current.classList.add("hidden")
           totalMarklabelref.current.classList.remove("hidden")
           examtypelabelref.current.classList.remove("hidden")
           if(window.innerWidth < 768){
            totalMarkinputref.current.readOnly = true;
           examtypeinputref.current.setAttribute("disabled", "true")
           }
         }

      const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = students.filter(student => 
            student.Roll_No.toLowerCase().includes(searchTerm)
        );
        setFilteredStudent(filteredData);
      };
      
      const handleTable = (e) => {
       e.preventDefault()
        
        //const rollNo = Object.keys(marksMap);
        console.log(marksMap);
      }

  return (
   <div >
    {
      loading?(
        <p>Loading....</p>
      ):(
        <div className=' flex w-full  h-screen '>

     <Selectdepartment onChange={handleChange} showList={showList} formData={formData} heading="Add Result"/>

    <div className='w-full lg:w-[80%] p-2 md:p-5 mt-13  overflow-y-scroll lg:block hidden' ref={listref} >

<div className='sticky top-0 z-1 bg-blue-50 py-3'>
   <div className='flex lg:flex-none'>
   <div  
      onClick={hideList}
      className='lg:hidden text-xl font-extrabold text-teal-900 rounded-full'>
        <FontAwesomeIcon icon={faArrowLeft} />
   </div>
   <div className='text-center w-full'>
    <h3 className='text-xl font-bold'>Add Result</h3>
   </div>
   </div>

   <div className='flex justify-between items-center mt-6 lg:mt-3'>
    <input type="text" placeholder='Search By Roll_No' 
    onChange= {handleFilter}
    className='md:px-4 px-3 py-1 rounded text-sm md:text-[17px] md:border-none border border-gray-300 bg-white md:block hidden'/>

  <form className='flex gap-3 md:gap-2 items-center bg-sky-400 px-3 md:px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-lg  md:w-auto w-full'
        onSubmit={(e) => {handleTotalMark(e)}}
  >
      <div className='flex md:flex-row flex-col gap-1 md:gap-2 w-full'>
        <div className='flex md:flex-none md:w-auto w-full'>
          <h3 className='text-sm mr-1 p-1 md:hidden hidden' ref={examtypelabelref}>Exam_Type</h3>
          <input type='text' placeholder='Exam Type'
      required
    value={Exam}
    ref={examtypeinputref}
    onChange={(e) => {setExam(e.target.value)}}
    className='bg-gray-100 border border-gray-300 text-sm  py-1 px-4 md:px-3 outline-none rounded-lg w-full md:w-auto'/>
        </div>
      
       <div className='flex md:flex-none w-full md:w-auto'>
        <h3 className='text-sm mr-1 p-1 md:hidden hidden' ref={totalMarklabelref}>Total_Mark</h3>
         <input type="number" placeholder="Total Mark" 
        required
            value={totalMark}
            ref={totalMarkinputref}
            onChange={(e) => {setTotalMark(e.target.value);}}
            className="bg-gray-100 border outline-none border-gray-300 text-sm  rounded-lg px-4 md:px-3 py-1 w-full md:w-auto"/>
       </div>
      </div>

            <button className='bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] text-white py-1.5 md:py-1 lg:py-1.5 px-3 text-sm rounded-lg font-bold cursor-pointer md:block' ref={totalMarksubmitref}>Submit</button>
  </form>
    
    <Link to={"/viewresult"} className='px-4 py-1 bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] rounded text-white hidden lg:block'>Results Report</Link>
   </div>
</div>

    <form className='rounded shadow-md overflow-x-auto '
    onSubmit={(e) => {handleTable(e)}}
    >
      <DataTable 
        columns={colomns}
        data={filteredStudent.length > 0 ? filteredStudent: students}
        // pagination
        responsive
        customStyles={{
          headRow: {
            style: {
              color: 'white',
              backgroundColor: '#508FF7',
              fontSize: '13px',
              fontWeight: 'semi-bold',
              minHeight: '47px',
              // zIndex: 1,
              // position: 'sticky',
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

       <div className='flex justify-end pb-2 mt-2 mr-5'>
         <button className='bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] text-white text-xl py-1 px-4 rounded-md font-semibold cursor-pointer '>
          Submit
        </button>
       </div>
    </form>

   </div>
        </div>
      )
    }

   </div>
  )
}

export default Addresult
