export const colomns=[
          { name: 'SL NO', selector: (row) => row.SL_NO , sortable: true, defaultSortDirection: 'asc' },
          { name: 'Roll No', selector: (row) => row.Roll_No , hide:"md"},
          { name: 'Pay Fees', selector: (row) => row.Pay_Fees },
          { name: 'Pay Date', selector: (row) => row.Pay_Date },
          { name: 'Remains Fees', selector: (row) => row.Remains_Fees , hide:"md"},
]

// export const data = [
//           { SL_NO: 1, Roll_No: 'GGPBCA0022001', Pay_Fees: '2000', Pay_Date: '2023-10-01', Remains_Fees: '3000' },
//           { SL_NO: 2, Roll_No: 'GGPBBT0022003', Pay_Fees: '3000', Pay_Date: '2023-10-02', Remains_Fees: '3000' },
//           { SL_NO: 3, Roll_No: 'GGPBBA0022003', Pay_Fees: '4000', Pay_Date: '2023-10-03', Remains_Fees: '3000' },
//           { SL_NO: 4, Roll_No: 'GGPBCA0022002', Pay_Fees: '2500', Pay_Date: '2023-10-04', Remains_Fees: '2500' }
//         ]