const mongoose = require('mongoose');
//const {getOptions} = require('../utils/viewHelper');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength:[4, 'Name is too short!'],
        required: [true, 'Name is required!'],
    },
    image:{
        type: String,
        required: [true, 'Image is required!'],
        match:[ /[A-Za-z]+\:\/+/, 'Image not match'],
    },
    price:{
     type: Number,
     required:[true, 'Price is required!'],
     min: [1, 'Price not valid'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      minLength: [10, 'Description is too short!'],
    },
    genre:{
       type: String,
       required: [true, 'Genre is required!'],
       minLength: [2, 'Genre is too short!']
    },
    platform: {
       type: String,
        required: [true, 'Platform not valid'],
        match: [/[A-Za-z0-9]+/, 'Not valid platform']

       
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;