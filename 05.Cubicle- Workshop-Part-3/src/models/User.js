const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.path('username').validate(function(value) {
  const user = mongoose.model('User').findOne({username: value});

  return !!user;

}, 'Username already exists');

userSchema.virtual('repeatPassword')
 .set(function (value) {
    if(value !== this.password){
        throw new Error('Password missmatch');
    }
})

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})


const User = mongoose.model('User', userSchema);

module.exports = User;