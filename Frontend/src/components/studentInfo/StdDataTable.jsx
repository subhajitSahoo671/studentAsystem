
import { useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faEdit, faTrash, faMoneyBill1Wave} from "@fortawesome/free-solid-svg-icons"
import Viewstudent from "./Viewstudent"
import { useState } from "react"
import Editstudent from "./Editstudent"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import Feeshistory from "../studentfees/Feeshistory"
import axios from "axios"

export const colomns=[
          { name: 'Name', selector: (row) => row.name ,width: '190px' },
          //{ name: 'std', selector: (row) => row.std ,width: '200px', hide: "sm"?"":"lg"},
          { name: 'Image', selector: (row) => row.Image ,width: '150px' ,hide: "md"},
           { name: 'Department', selector: (row) => row.Department ,width: '190px', hide: "md"},
        //   { name: 'Year', selector: (row) => row.Year ,width: '150px'},
          { name: 'Roll_No', selector: (row) => row.Roll_No, sortable: "true", defaultSortDirection: 'asc' ,width: '190px', hide:"sm"},
          { name: 'Actions', selector: (row) => row.Action , center: "true" }
]

export const StdActionBtns = ({Id}) => {
    const navigate = useNavigate();
    const [showModal1, setShowmodal1] = useState(false)
    const [showModal2, setShowmodal2] = useState(false)
    const [showModal3, setShowmodal3] = useState(false)
    const [showModal4, setShowmodal4] = useState(false)

        const handleDelete =  () => {
            const confirm = window.confirm("Are you sure you want to delete this student?");

            if(confirm){
                setShowmodal3(true)
            }

        }

            const handleConfirm = async (e, id) => {
                e.preventDefault();
                const input = e.target.elements[0].value;

            if (input !== "delete account") {
                alert("Please type 'delete account' to confirm.");
                return;
            }

            try {
                const response = await axios.delete(`http://localhost:4000/api/v1/admin/deletestudent/${id}`, 
                {
                    //    headers: {
                    //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                    //    }
                    });
                    if (response.status == 200) {
                        setShowmodal3(false);
                        alert(response.data.message);
                    } else {
                        alert("Failed to delete student");
                    }
                } catch (error) {
                    console.error("Error deleting student:", error);
                }
            }
        

    return(
        <div className="flex space-x-1.5 md:space-x-2 lg:space-x-3 h-7 ">
            <button 
            onClick={() => setShowmodal1(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faEye} />
            </button>{showModal1&& <Viewstudent id={Id} onClose={() => setShowmodal1(false)}/>}

            <button 
            onClick={() => setShowmodal2(true)}
            className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faEdit} />
            </button>{showModal2&& <Editstudent id={Id} onClose={() => setShowmodal2(false)}/>}

            <button 
            onClick={() => handleDelete()}
            className="bg-gradient-to-br from-red-500 to-red-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faTrash} />
            </button>{showModal3&& <ConfirmDeleteModal id={Id} handleConfirm={handleConfirm} onClose={() => setShowmodal3(false)}/>}

             <button 
             onClick={() => setShowmodal4(true)}
            className="bg-gradient-to-br from-green-500 to-green-300 text-xs md:text-sm text-white px-2 md:px-3 py-1 cursor-pointer rounded-md">
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
            </button>{showModal4&& <Feeshistory id={Id} onClose={() => setShowmodal4(false)}/>}
        </div>
    )
}