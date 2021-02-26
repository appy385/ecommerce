module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CategoryItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
      },
      item_pid: {
        type: Sequelize.INTEGER,
        references: { model: 'Items', key: 'id' },
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
    await queryInterface.dropTable('CategoryItems');
  },
};
