module.exports = function(sequelize, DataTypes) {
  var Wishlist = sequelize.define("Wishlist", {
    totalCost: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00
    },
    budget: {
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

    Wishlist.hasMany(models.WishlistItem, {
      onDelete: "cascade"
    });
  };

  return Wishlist;
};
