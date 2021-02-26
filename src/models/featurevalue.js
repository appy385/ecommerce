const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FeatureValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeatureValue.init({
    feature_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: Feature,
        key: 'id',
      },
    },
    value_pid: {
      type: DataTypes.INTEGER,
      references: {
        model: Value,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'FeatureValue',
  });
  return FeatureValue;
};
