module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Wishlist", {
      totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    });
  
    Wishlist.associate = function(models) {
      // We're saying that a Wishlist should belong to an User
      // A Wishlist can't be created without an User due to the foreign key constraint
      Wishlist.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Wishlist;
  };
  