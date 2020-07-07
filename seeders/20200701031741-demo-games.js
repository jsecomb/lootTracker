'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', [
      {
        title: "Red Dead Redemption 2",
        price: 59.99,
        releaseDate: "Dec 5, 2019",
        linkOrId: "1174180",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        title: "Halo: The Master Chief Collection",
        price: 39.99,
        releaseDate: "Dec 3, 2019",
        linkOrId: "976730",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        title: "Half-Life: Alyx",
        price: 59.99,
        releaseDate: "Mar 23, 2020",
        linkOrId: "546560",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        title: "DOOM Eternal",
        price: 59.99,
        releaseDate: "Mar 19, 2020",
        linkOrId: "782330",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        title: "Borderlands 3",
        price: 59.99,
        releaseDate: "Mar 13, 2020",
        linkOrId: "397540",
        createdAt: new Date,
        updatedAt: new Date
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
