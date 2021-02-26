module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FeatureValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      feature_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Features', key: 'id' },
      },
      value_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Values', key: 'id' },
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
    await queryInterface.dropTable('FeatureValues');
  },
};
