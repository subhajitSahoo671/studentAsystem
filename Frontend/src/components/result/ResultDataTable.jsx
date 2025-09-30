
import { useEffect, useState } from "react"

export const colomns=[
          { name: 'Name', selector: (row) => row.name ,width: '190px' },
          { name: 'Department', selector: (row) => row.Department ,width: '190px', hide: "md"},
          { name: 'Roll_No', selector: (row) => row.Roll_No, sortable: "true",width: '160px', defaultSortDirection: 'asc' ,hide:"sm"},
         // { name: 'Total Mark', selector: (row) => row.Total_Mark ,width: '200px'},
          { name: 'Marks', selector: (row) => row.Marks, center: "true" },

]


export const StdMarkInputs = ({Id,onAccuredMarkChange, totalMark}) => {
  //  const [totalMark, setTotalMark] = useState("");
     const [marks, setMarks] = useState({
        totalMark: "",
        accuredMark: ""
     });
     
    useEffect(() => {
        if(totalMark){
           // console.log(totalMark);
            setMarks((prev) => ({ ...prev, totalMark }));
        }
    }, [totalMark]);

    useEffect(() => {
    if (onAccuredMarkChange) {
      onAccuredMarkChange(Id, marks.accuredMark, marks.totalMark);
     // console.log(Id, marks.accuredMark, marks.totalMark);
      
    }
  }, [marks.accuredMark, marks.totalMark, Id, onAccuredMarkChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const mark = { ...marks, [name]: value };
        setMarks(mark);

    const { totalMark, accuredMark } = mark;

    if (totalMark && accuredMark) {
    
        if (Number(accuredMark) > Number(totalMark)) {
             alert("Accured mark should not be greater than total mark");
            setMarks((prev) => ({ ...prev, accuredMark: "" }));
        }
        else if(Number(accuredMark) < 0){
            alert("Accured mark should not be Negative");
            setMarks((prev) => ({ ...prev, accuredMark: "" }));
        }
//         else{  const resultData = {
//                Id,
//                totalMark,
//                accuredMark
//            };
//        console.log(resultData);
//    }
    }
    
   // const totalMarkobj = totalMark ? Number(totalMark) : 0;

    }

    return(
        <div>
            <div className="flex space-x-3">
            <input type="number" placeholder="Total Mark" name="totalMark"
            required
            value={marks.totalMark}
            onChange={(e) => {
                 handleChange(e)
                }} 
            className="bg-gray-100 border outline-none border-gray-300 rounded-md px-2 py-1 md:block hidden"/>
            <input type="number" placeholder="Accured Mark" name="accuredMark"
            required
            value={marks.accuredMark}
            onChange={handleChange}
            className="bg-gray-100 border outline-none border-gray-300 rounded-md px-2 py-1 md:w-auto w-30"/>
        </div>
        </div>
    )
};