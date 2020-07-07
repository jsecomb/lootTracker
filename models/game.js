module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      releaseDate: {
        type: DataTypes.STRING
      },
      linkOrId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imgLink: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.DECIMAL
      }
    });
  
    Game.associate = function(models) {
      Game.hasMany(models.WishlistItem, {
      });
    };
  
    return Game;
  };
  