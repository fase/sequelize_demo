module.exports = function(Sequelize) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);

  return sequelize.define('Account', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  });
};
