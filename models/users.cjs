module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
    },
    { tableName: "users", timestamps: true }
  );
  return User;
};
