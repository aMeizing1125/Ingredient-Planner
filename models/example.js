module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  });
  return Example;
};
