const  Restaurant  = require('./restaurant');
const { Grade } = require('./grade');

const db = {
  Restaurant,
  Grade
};

// console.log(Object.keys(db))
console.log(Restaurant.associate)
console.log(Grade.associate)

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;



