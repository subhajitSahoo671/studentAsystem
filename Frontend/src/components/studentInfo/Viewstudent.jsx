import React, { useEffect, useState } from 'react'
import LeftsideInfo from './LeftsideInfo'
import RightsideInfo from './RightsideInfo'
import { useParams } from 'react-router-dom'
//import studentinfo from "../../assets/studentInfo.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


function Viewstudent({id, onClose}) {
  //const {id} = useParams()
  const [loading, setLoading] = useState("")
  const [students, setStudents] = useState("")

  // console.log(id);
  

  useEffect(() => {
    const fetchStudents = async() => {
      setLoading(true)
      try {
        const responnse = await axios.get("http://localhost:4000/api/v1/admin/viewstudents");
        if(responnse.status === 200){
          const std=responnse.data.find(student=> student._id == id)
          setStudents(std)
          // console.log(std);
        }
        else{
          console.error(responnse.data.error);
        }
      } catch (error) {
              alert(error.response.data.error)
              console.error(error);
      }
      finally{
              setLoading(false)
            }
    }
    fetchStudents()
  },[])

  return (
    <>
   
    <div className=' z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center '>
      {
     loading ? (
      <p>Loading.....</p>
    ) : (
      <div className='md:px-10 h-full md:bg-gradient-to-b from-white to-green-100 flex md:flex-row flex-col md:w-[80%]'>
        <button 
        onClick={onClose}
        className='fixed  cursor-pointer px-2 py-[1px] mt-15 md:mt-18 text-xl font-extrabold text-black rounded-full 
         hover:text-blue-700'>
          <FontAwesomeIcon icon={faArrowLeft} /></button>
        <LeftsideInfo students={students} />
        <RightsideInfo students={students} />
      </div>
    )
     }
    </div>
  
    </>
  )
}

export default Viewstudent
