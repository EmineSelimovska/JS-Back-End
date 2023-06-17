const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/secret');

exports.register = async (userData) =>  {
const user = await User.findOne({username: userData.username});
    if(user){
        throw new Error('Username already exist');
    }

  return  User.create(userData);

}
      // TODO......
exports.login = async (username, email, password) => {
    const user = await User.findOne({email}); // or: username
   
    
     if(!user){
        throw new Error('Cannot find username, password or email');
    }
    

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Cannot find username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        

       
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return token;
}


