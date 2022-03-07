import {Schema, model, Model} from "mongoose";

interface user {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    middleName: string,
    apartments: [apartmetID: Schema.Types.ObjectId],
    verified: boolean
}

const userSchema = new Schema <user, Model<user>>({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    middleName:{
        type: String
    },
    lastName:{
        type: String,
        required: true
    },
    apartments:[{
        apartmetID: {
            type: Schema.Types.ObjectId,
            ref: 'apartment'
        }
    }],
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    }
})

const User = model<user>('User', userSchema)

export default User;