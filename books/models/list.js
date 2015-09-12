'use strict';

module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                List.belongsTo(models.User);

                List.hasMany(models.Book);
            }
        }
    });
    return List;
};