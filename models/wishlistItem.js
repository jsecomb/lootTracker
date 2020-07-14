module.exports = function(sequelize, DataTypes) {
    var WishlistItem = sequelize.define("WishlistItem", {
      purchaseDate: {
        type: DataTypes.STRING,
        default: 'null'
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
  
      WishlistItem.belongsTo(models.Game, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return WishlistItem;
  };
  