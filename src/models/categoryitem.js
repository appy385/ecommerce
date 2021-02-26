const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryItem.init({
    category_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
    item_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'CategoryItem',
  });
  return CategoryItem;
};
