import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
     stdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true
      },
      paidFeesDetails: {
          totalFees: { type: Number, required: true },
          paidFees: { type: Number, required: true },
          remainingFees: { type: Number, required: true },
      },
      payFeesDetails: {
          feesAmount: { type: Number, required: true },
          feesDate: { type: String, required: true },
          //required: true,
      }
    },{timestamps:true});

    export const FeesSchema = mongoose.model("fees",feesSchema)