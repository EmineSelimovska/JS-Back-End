const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name is too short'],
        required: [true, 'Name is required'],
    },
    imageUrl: {
        type: String,
        match:[ /^https?:\/\//, 'Invalid imageUrl!'],
        required: [true, 'ImageUrl is required'],
    },
    price: {
        type: Number,
        min: [1, 'Price is not positive number!'],
        required: [true, 'Price is required'],
    },
    description: {
        type: String,
        minLength: [10, 'Description is no longer!'],
        required: [true, 'Crypto description is required'],
    },
    payment: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true,'Payment method is required'],
    },
    buyACrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;