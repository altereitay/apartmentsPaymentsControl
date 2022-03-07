import mongoose, {Schema, model, Model} from "mongoose";
import payment1 from "./Payment";

interface apartment {
    tenants: [userID: Schema.Types.ObjectId, payments: [Schema.Types.ObjectId]],
    payments: [Schema.Types.ObjectId],
    headOfTenants: Schema.Types.ObjectId
}

const apartmentSchema = new Schema<apartment, Model<apartment>>({
    tenants:[{
        userID:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        payments:[{
            type: Schema.Types.ObjectId,
            ref: 'payment'
        }]
    }],
    headOfTenants:{
        userID:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        required: true
    },
    payments:[{
        payment: {
            type: Schema.Types.ObjectId,
            ref: 'payment'
        }
    }]
})

const Payment = model<apartment>('Payment', apartmentSchema);
export default Payment;