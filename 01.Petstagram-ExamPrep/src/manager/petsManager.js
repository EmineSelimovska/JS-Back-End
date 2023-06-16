const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner');

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');

exports.create = (photoData) => {
    const photo = new Photo(photoData);

    return photo.save();
}

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.update = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.addComment = async (photoId, commentData) => {
     const photo = await Photo.findById(photoId);

     photo.commentList.push(commentData);

     return photo.save();
}

exports.getByOwner = (userId) => Photo.find({owner: userId});