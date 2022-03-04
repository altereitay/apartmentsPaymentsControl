const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    apartmentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'apartment',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

module.exports = Payment = mongoose.model('payment', paymentSchema);