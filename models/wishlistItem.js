module.exports = function(sequelize, DataTypes) {
    var WishlistItem = sequelize.define("WishlistItem", {
      totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    });
  
    WishlistItem.associate = function(models) {
      // We're saying that a Wishlist should belong to an User
      // A Wishlist can't be created without an User due to the foreign key constraint
      WishlistItem.belongsTo(models.Wishlist, {
        foreignKey: {
          allowNull: false
        }
      });
  
      WishlistItem.hasOne(models.Game, {});
    };
  
    return WishlistItem;
  };
  