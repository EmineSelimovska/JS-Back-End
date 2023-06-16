const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength:[2, 'Username is too short!'],
        unique: {
           value: true,
            message: 'Username already exists',
        }
    },
    email: {
        type: String,
        required: [true, 'Email is require'],
        minLength:[10, 'Email is too short!'],
        unique: {
           value: true,
            message: 'Email already exists',
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength:[4, 'Password is too short!'],

    }
});

userSchema.path('username').validate(function(value) {
    const user = mongoose.model('User').findOne({username: value});

    return !!user
}, 'Username already exists');

userSchema.path('email').validate(function(value) {
    const email = mongoose.model('User').findOne({email: value});

    return !!email
}, 'Email already exists');

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if(value !== this.password) {
            throw new Error('Password missmatch!')
        }
    });

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;


