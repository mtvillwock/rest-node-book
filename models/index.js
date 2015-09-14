'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};


if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true //false
    })
} else {

    if (config.use_env_variable) {
        var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Will make foreign keys underscored later
db['User'].hasMany(db['List'], {
    foreignKey: 'UserId'
});
db['List'].belongsTo(db['User'], {
    foreignKey: 'UserId'
});
db['List'].hasMany(db['Book'], {
    foreignKey: 'ListId'
});
db['Book'].belongsTo(db['List'], {
    foreignKey: 'ListId'
});


console.log("DB['model'] IN /models/INDEX JS---");
console.log(db['User']);
console.log(db['List']);
console.log(db['Book']);
console.log("DB IN /models/INDEX JS ----");
module.exports = db;