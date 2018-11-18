module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING
  });

  Reservation.associate = function(models){
    Reservation.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };
  return Reservation;
};
