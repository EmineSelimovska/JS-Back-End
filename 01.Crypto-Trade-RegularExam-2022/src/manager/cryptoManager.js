const Crypto = require('../models/Crypto');

exports.getAll = async (search, payment) => {
  let result = await Crypto.find().lean();

  if(search){
    result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  if(payment){
    result = result.filter(c => c.payment.includes(payment))
  }
    return result;
}

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate('owner');

exports.create = async (cryptoData) => {
    const crypto = new Crypto(cryptoData);

    if(!cryptoData){
        throw new Error('Invalid data');
    };

    return crypto.save();
}

exports.update = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)

exports.addBuy = async (cryptoId,userId) => {
    const crypto = await Crypto.findById(cryptoId);
     
    crypto.buyACrypto.push(userId);
    
    return crypto.save();
}