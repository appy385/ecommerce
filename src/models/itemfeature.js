const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemFeature.init({
    item_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'id',
      },
    },
    feature_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Feature',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'ItemFeature',
  });
  return ItemFeature;
};
