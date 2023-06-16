const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name is too short'],
        required: [true, 'Name is required!']
    },
    image:{
        type: String,
        required: [true, 'Image is required!'],
        validate:{
          validator: function(value){
             return /^https?:\/\//.test(value);

          },
          message: 'Invalid imageUrl',

        } 

     },
    age: {
        type: Number,
        required: [true,'Age is required!'],
        min: [1, 'Age is no  longer!'],
        max: [100, 'Age is no longer'],

    },
    description: {
        type: String,
        required: [true,'Descriptions is required!'],
        minLength: [5, 'Description is no longer!'],
        maxLength: [50, 'Description is no longer!'],
    },
    location:{
        type: String,
        required: [true,'Location is required!'],
        minLength: [5, 'Location is not longer!'],
        maxLength: [50, 'Location is not longer!'],
    },
    commentList: [{
         user: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'User'
          },
          comment: {
            type: String,
            required: [true, 'Comment message is required!']
          },
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;