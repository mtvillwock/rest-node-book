var Sequelize = require('sequelize');
var sequelize = new Sequelize('books', 'root', process.env.MY_SQL_PW, {
 host: 'localhost',
 dialect: 'mysql',
 define: {
 timestamps: false,
 }
});

module.exports.database = sequelize;