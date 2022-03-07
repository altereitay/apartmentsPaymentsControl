import {Schema, model, Model} from "mongoose";

interface payment{
    apartmentID: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    amount: number
}


const paymentSchema = new Schema<payment, Model<payment>>({
    apartmentID:{
        type: Schema.Types.ObjectId,
        ref: 'apartment',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

const Payment = model<payment>('Payment', paymentSchema)

export default Payment;