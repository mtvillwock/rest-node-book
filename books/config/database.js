var Sequelize = require('sequelize');
var sequelize = new Sequelize('books', 'root', 'tXX2CJugtvFH4r', {
 host: 'localhost',
 dialect: 'mysql',
 define: {
 timestamps: false,
 }
});

module.exports.database = sequelize;