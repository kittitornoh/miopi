module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade', // delete all posts related to user
    });
  };

  return Users;
};
