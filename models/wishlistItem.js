module.exports = function(sequelize, DataTypes) {
    var WishlistItem = sequelize.define("WishlistItem", {
      totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      purchaseDate: {
        type: DataTypes.DATE
      }
    });
  
    WishlistItem.associate = function(models) {
      // We're saying that a WishlistItem should belong to an Wishlist
      // A WishlistItem can't be created without an Wishlist due to the foreign key constraint
      WishlistItem.belongsTo(models.Wishlist, {
        foreignKey: {
          allowNull: false
        }
      });
  
      WishlistItem.hasOne(models.Game, {});
    };
  
    return WishlistItem;
  };
  