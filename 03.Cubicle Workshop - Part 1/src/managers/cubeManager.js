const uniqid = require('uniqid');
const cubes = [
  {
    id: uniqid(),
    name: 'Mirror cube',
    description: 'A cool mirror cube',
    imageUrl: 'https://m.media-amazon.com/images/I/81XkUCfu0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    difficultyLevel: 3,
  },
  {
    id: uniqid(),
    name: 'Speed Cube',
    description: 'Very difficulty rubik cube',
    imageUrl: 'https://m.media-amazon.com/images/I/61PV6ut0tOS._AC_UF894,1000_QL80_.jpg',
    difficultyLevel: 5,
  },
  {
    id: uniqid(),
    name: 'Magic cube',
    description: 'A very megic and interesting cube',
    imageUrl: 'https://m.media-amazon.com/images/I/411vGh7gkJL._AC_.jpg',
    difficultyLevel: 6,
  }
];

exports.getAll = (search, from, to) => {
  let result = cubes.slice();

  if(search){
     result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
  }
  if(from){
    result = result.filter(cube => cube.difficultyLevel >= Number(from));
  }
  if(to){
    result = result.filter(cube => cube.difficultyLevel <= Number(to));
  }

  return result
};

exports.getOne = (cubeId ) => cubes.find(x => x.id == cubeId);


exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
}
    cubes.push(newCube);

    return newCube;
}