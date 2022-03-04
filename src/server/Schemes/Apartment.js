const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    tenants:[{
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        payments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'payment'
        }]
    }],
    headOfTenants:{
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        required: true
    },
    payments:[{
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'payment'
        }
    }]
})

module.exports = Apartment = mongoose.model('apartment', apartmentSchema);