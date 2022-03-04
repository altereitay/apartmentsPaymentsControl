const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
                type: mongoose.Schema.Types.ObjectId,
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
    }
})

module.exports = User = mongoose.model('user', userSchema);