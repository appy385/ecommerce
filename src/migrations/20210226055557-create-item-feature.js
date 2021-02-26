module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Items', key: 'id' },
      },
      feature_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Features', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ItemFeatures');
  },
};
