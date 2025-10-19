import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { colomns } from './Feesdatatable'
import { Link, useParams } from 'react-router-dom'
//import fees from '../../assets/fees.json'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
let i=1;

const Feeshistory = ({id, onClose }) => {

  //const { id } = useParams();
  const [loading, setLoading] = useState("");
  const [data, setdata] = useState([])
  const [responnse, setResponnse] = useState([]);

  useEffect(() => {
     const fetchData = async() => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/admin/feesRecord/${id}`);
        if (response.data.success) {
          const data = response.data.feesrecord.map((std) => ({
            SL_NO: i++,
            Roll_No: std.stdId.rollNo,
            Pay_Fees: std.payFeesDetails.feesAmount,
            Pay_Date: std.payFeesDetails.feesDate,
            Remains_Fees: std.paidFeesDetails.remainingFees
         }))
           setdata(data);

           const fees = response.data.feesrecord;
           var big = 0;
                for( i=0 ; i < fees.length ; i++){
                   let paid = fees[i].paidFeesDetails.paidFees;
                 if(paid > big){
                  big = paid;               
                 }
                }
                 const responnse = fees.find((e) => (e.paidFeesDetails.paidFees == big))
                 setResponnse(responnse);
                 
        }
        else{
          console.error(response.data.error);
        }
         
      } catch (error) {
        console.error("error in feesRecord",error);
       // alert(error.response.data.error);
      }
      finally{
        setLoading(false);
      }
     };
     fetchData();
  },[id])

  return (
    <div className='z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center '>

   <div className='w-full  h-full '>
   {
    loading?(
      <p>
        Loading....
      </p>
    ):(
       <div className='w-full px-5 md:px-40 py-5 relative mt-10 ' >

   <div className='flex justify-center items-center'>
     <button 
        onClick={onClose}
        className=' cursor-pointer text-xl font-extrabold text-black rounded-full 
         hover:text-blue-700'>
          <FontAwesomeIcon icon={faArrowLeft} /></button>
    <div className='text-center w-full mb-5 mt-5 md:mt-10'>
    <h3 className='text-xl md:text-2xl font-bold'>Fees History</h3>
   </div>
    </div>     
   
   <div className='flex justify-between items-center'>
    <div className='flex md:flex-row flex-col gap-2'>
      <h3 className='px-4 py-1 text-[15px] font-semibold bg-[#38accf] rounded text-white'>Coures Fees : { responnse?.paidFeesDetails?.totalFees} /-</h3>
      <h3 className='px-4 py-1 text-[15px] font-semibold bg-[#2a97e6] rounded text-white hidden lg:block'>Paid Fees : {responnse?.paidFeesDetails?.paidFees} /-</h3>
      <h3 className='px-4 py-1 text-[15px] font-semibold bg-[#ce63ce] rounded text-white'>Ramaining Fees : {responnse?.paidFeesDetails?.remainingFees} /-</h3>
    </div>
    <Link to={"/payfees"} className='px-4 py-1 bg-gradient-to-br from-[#cf50cf] to-[#2a97e6] rounded text-white'>Pay Fees</Link>
   </div>

    <div className='mt-5 rounded shadow-md'>
      <DataTable
        columns={colomns}
        data={data ? data : []} // Ensure data is an array
       // pagination
       />
    </div>

   </div>
    )
   }
   </div>

   </div>
  )
}

export default Feeshistory
