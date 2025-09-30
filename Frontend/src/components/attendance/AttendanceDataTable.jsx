
import axios from "axios"
import { Link } from "react-router-dom"

export const colomns=[
          { name: 'Name', selector: (row) => row.name ,width: '190px' },
          { name: 'Department', selector: (row) => row.Department ,width: '190px', hide: "md"},
          { name: 'Roll_No', selector: (row) => row.Roll_No, sortable: true, defaultSortDirection: 'asc' ,width: '160px', hide:"sm"},
          { name: 'Actions', selector: (row) => row.Action , center: true }
]

// export const data = [
//           { id: 1, name: 'John Doe', Department: 'BCA', Roll_No: 'GGPBCA0022001' },
//           { id: 2, name: 'Jane Smith', Department: 'BBT', Roll_No: 'GGPBBT0022003' },
//           { id: 3, name: 'Alice Johnson', Department: 'BBA', Roll_No: 'GGPBBA0022003' },
//           { id: 4, name: 'Bob Brown', Department: 'BCA', Roll_No: 'GGPBCA0022002' }
//         ]


export const AttendanceButtons = ({status, Id, statusChange, formdata}) => {
   // console.log(status, Id);
    
    const markStudent = async(status, Id) => {
    console.log(`Marking student ${Id} as ${status}`);
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/admin/markAttendance/${Id}`, { status: status });
        if (response.data.success) {
            console.log(response.data.message);
                statusChange(formdata);
            }else {
                console.error("Error marking attendance:", response.data.error);
            }
    } catch (error) {
        console.error("Error marking attendance:", error);
    }
}
    return(
        <div>
            {
               status == null ? (
                    <div className="flex space-x-2 md:space-x-5">
                        <button 
                        onClick={() => markStudent("present", Id)}
                        className="bg-gradient-to-br from-green-500 to-green-300 text-white px-3 md:px-4 py-1 cursor-pointer">
                            Present
                        </button>
                        <button onClick={() => markStudent("absent", Id)}
                         className="bg-gradient-to-br from-red-500 to-red-300 text-white px-3 md:px-4 py-1 cursor-pointer">
                            Absent
                        </button>
                     </div>
                ):(
                    <div className="flex space-x-5 md:space-x-8 bg-gray-300 px-4 pr-1.5 md:pr-1.5 md:px-6 lg:pr-2 py-1 rounded-xl justify-center items-center">
                        <p className="font-medium text-gray-800">{status}</p>
                        <button onClick={() => markStudent(null, Id)}
                         className="bg-gradient-to-br from-orange-400 to-orange-200 text-white px-3 md:px-4 py-1  rounded-xl cursor-pointer ">
                            Reset
                        </button>
                    </div>
                )
            }
        </div>
    )
}