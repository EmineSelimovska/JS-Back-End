const Game = require('../models/Game');

exports.getAll = async (search, platform) => {
    let game = await Game.find().lean();

    if(search){
        game = game.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(platform){
        game = game.filter(g => g.platform.includes(platform))
    }
   


    return game;
}


exports.create = async (gameData) => {
    const game = new Game(gameData);
    if(!gameData){
        throw new Error('Invalid data');
    }
   

    return game.save();
};

exports.getById = (gameId) => Game.findById(gameId);

exports.update = (gameId,gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId)