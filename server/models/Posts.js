module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users);
  };

  return Posts;
};
