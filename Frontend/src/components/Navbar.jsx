import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsymmetrik} from '@fortawesome/free-brands-svg-icons'
import {faBars, faCaretRight} from "@fortawesome/free-solid-svg-icons"

 import "./Navbar.css";
  
function Navbar() {

  const [dropdown1,setDropdown1] = useState(false);
  const [dropdown2,setDropdown2] = useState(false);
  const [dropdown3,setDropdown3] = useState(false);

  const [resdropdown1,setResdropdown1] = useState(false);
  const [resdropdown2,setResdropdown2] = useState(false);
  const [resdropdown3,setResdropdown3] = useState(false);

  //const [isopen, setIsopen] = useState(false);
  const resNavitemsRef = useRef(false);
      
  const toggleMenu = () => {
    //setIsopen(!isopen);
   if(resNavitemsRef.current.classList.contains("top-[-800px]")){
      resNavitemsRef.current.classList.remove("top-[-800px]")
      resNavitemsRef.current.classList.add("top-[8%]")
   }
   else if(resNavitemsRef.current.classList.contains("top-[8%]")){
      resNavitemsRef.current.classList.remove("top-[8%]")
      resNavitemsRef.current.classList.add("top-[-800px]")
   }
  };

  return (
    <div>
      <div className="Navbar border-b-2 border-blue-50 fixed shadow-sm text-white z-5">

  <div className="flex justify-center items-center space-x-2">
    <div className="">
      <div className=" md:hidden text-xl"
      onClick={toggleMenu}
      >
       <FontAwesomeIcon icon={faBars}/>
      </div>
      <ul
        // tabIndex={0}
        ref={resNavitemsRef}
       className="bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] border-1 rounded-box z-1 mt-3 w-40 p-2 space-y-2 shadow-md fixed 
       top-[-800px] transition-resNavitems md:hidden"
        >
        <li className='res-nav-item '>
          <a className='flex justify-between'
          onMouseEnter={() => {setResdropdown1(true)}}
          onMouseLeave={() => {setResdropdown1(false)}}
          >
          <h3>Students</h3> 
          <span>
          <FontAwesomeIcon icon={faCaretRight} />
          </span></a>
         {
          resdropdown1&&(
             <ul className="p-2 space-y-2">
                <li><a href='/'>Add Student</a></li>
                <li><a href='/studentlist'>Student List</a></li>
            </ul>
          )
         }
        </li><hr />
        <li className='res-nav-item'>
          <a className='flex justify-between'
          onMouseEnter={() => {setResdropdown2(true)}}
          onMouseLeave={() => {setResdropdown2(false)}}
          >
          <h3>Attendance</h3> 
          <span><FontAwesomeIcon icon={faCaretRight} />
          </span></a>
          {
          resdropdown2&&(
            <ul className="p-2 space-y-2">
            <li><a href='/attendance'>Add Attendance</a></li>
            <li><a href='/attendance-report'>View Attendance</a></li>
          </ul>
          )
          }
        </li><hr />
        <li className='res-nav-item'>
          <a className='flex justify-between'
          onMouseEnter={() => {setResdropdown3(true)}}
          onMouseLeave={() => {setResdropdown3(false)}}
          >
          <h3>Results</h3> 
          <span><FontAwesomeIcon icon={faCaretRight} />
          </span></a>
          {
            resdropdown3&&(
              <ul className="p-2 space-y-2">
                 <li><a href='/addresult'>Add results</a></li>
                 <li><a href='/viewresult'>View results</a></li>
             </ul>
            )
          }
        </li><hr />
        <li className='res-nav-item'>
          <a href='/payfees'>Add fees</a>
        </li><hr />
        <li className='res-nav-item'>
          <a href='/contactus'>Contact Us</a>
        </li>
      </ul>
    </div>
    <h3 className="m-1 bg-[#3c7ee9] text-lg md:text-xl lg:text-2xl flex items-center justify-center">
      <span className='text-white font-semibold md:block hidden'>Student</span><span className='text-white font-semibold block md:hidden'>S</span>
      <span className='text-white font-extrabold text-xl md:text-2xl lg:text-3xl'>
        <FontAwesomeIcon icon={faAsymmetrik} />
      </span>
      <span className='text-white font-semibold md:block hidden'>System</span><span className='text-white font-semibold block md:hidden'>S</span>
    </h3>
  </div>

  <div className="hidden md:flex">
    <ul className= "nav-items  px-1">

      <li className='nav-item' onMouseEnter={() => setDropdown1(true)} onMouseLeave={() => setDropdown1(false)}>        
      <div className='white-bg' >
          <h3
          onClick={() => {setDropdown1(!dropdown1)}}
          >Students</h3>
      </div>
         {
          dropdown1 && (
             <ul className="px-3 py-4 space-y-3 bg-white text-black z-5 fixed top-16 rounded-md shadow-md inner-shadow">
                <li 
                onClick={() => setDropdown1(false)}
                className='sub-items-w '><a href='/'>Add Student</a></li>
                <li 
                onClick={() => setDropdown1(false)}
                className='sub-items-w'><a href='/studentlist'>Student List</a></li>
          </ul>
          )
         }
      </li>

      <li className='nav-item' onMouseEnter={() => setDropdown2(true)} onMouseLeave={() => setDropdown2(false)}>
        <div className='black-bg'>
        <h2
        onClick={() => {setDropdown2(!dropdown2)}}
        > Attendance</h2>
      </div>
        { dropdown2 && (
            <ul className="px-3 py-4 space-y-3 bg-blue-400 text-white z-5 fixed top-16 rounded-md shadow-md inner-shadow-2">
            <li
            onClick={() => setDropdown2(false)} 
            className='sub-items-b '><a href='/attendance'>Add Attendance</a></li>
            <li 
            onClick={() => setDropdown2(false)}
            className='sub-items-b'><a href='/attendance-report'>View Attendance</a></li>
          </ul>
          )}
      </li>

     <li className='nav-item' onMouseEnter={() => setDropdown3(true)} onMouseLeave={() => setDropdown3(false)}>
       <div className='white-bg'>
        <h3
        onClick={() => {setDropdown3(!dropdown3)}}
        >Results</h3>
      </div>
        {dropdown3 && (
           <ul className="px-3 py-4 space-y-3 bg-white text-black z-5 fixed top-16 rounded-md shadow-md inner-shadow">
            <li 
            onClick={() => setDropdown3(false)}
            className='sub-items-w'><a href='/addresult'>Add Result</a></li>
            <li 
            onClick={() => setDropdown3(false)}
            className='sub-items-w'><a href='/viewresult'>View Result</a></li>
          </ul>
        )}
     </li>
          
      <li className='nav-item'>
        <div className='black-bg'>
       <h2><a href='/payfees'>Pay fees</a></h2>
      </div>
      </li>

    </ul>
  </div>

  <div className='flex md:gap-7 lg:gap-25'>
    <div className="md:text-[14px] lg:text-[16px] font-semibold cursor-pointer list-none px-[10px] py-[5px] rounded-[5px] md:flex items-center justify-center 
    hover:bg-blue-400 hover:text-gray-800 hidden">
    <a className=" ">Contact Us</a>
  </div>
  <div className="buttons flex items-center justify-center">
    <a className=" ">Sign Up</a>
  </div>
  
  </div>

</div>
    </div>
  )
}

export default Navbar
