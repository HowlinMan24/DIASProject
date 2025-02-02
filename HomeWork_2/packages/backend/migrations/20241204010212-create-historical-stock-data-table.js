'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('historical_stock_data', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      publisherCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      datePublished: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      priceLastTransaction: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      minPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      maxPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      averagePrice: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      promotionPercentage: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      turnoverBESTDenar: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      totalTurnoverDenars: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('historical_stock_data');
  }
};
