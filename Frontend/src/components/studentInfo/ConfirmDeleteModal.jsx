import React from 'react'

function confirmDeleteModal({id, handleConfirm, onClose}) {
  return (
    <div className='z-1 inset-0 fixed  backdrop-opacity-100 backdrop-blur-lg flex justify-center items-center'>
      <div className='md:py-10 px-20 bg-gradient-to-br from-gray-800 to-gray-700 text-white md:w-[40%] h-[55%]'>
            <h3 className='text-xl font-semibold w-full text-center mb-10'>Delete Student Account</h3>
            <h3 className='text-[16px]'>Are you sure you want to delete student account?you will</h3>
            <h3 className='text-[16px] mb-5'> permanently lose all data associated with this account.</h3>
            <h3 className='text-[16px] mb-5'>Type "delete account" to confirm</h3>

            <form 
            onSubmit={(e) => handleConfirm(e, id)}
            className='flex flex-col '>
                <input type="text" placeholder='Type Here'
                className='bg-gray-50 border border-gray-300 py-1 px-4 rounded-md outline-none text-black text-[16px] w-[80%]'/>

                <div className='flex justify-around my-10 w-[80%]'>
                    <button 
                    className='cursor-pointer py-1 px-4 rounded-md text-[16px] font-semibold text-white bg-gradient-to-br from-teal-400 to-[#5fb4f0]'
                    type='submit'>Confirm</button>
                    <button 
                    onClick={onClose}
                    className='cursor-pointer py-1 px-4 rounded-md text-[16px] text-black font-semibold bg-white border'>Cancel</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default confirmDeleteModal
