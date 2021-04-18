const dbConfig = require("../config/db.config.js");
const fs = require("fs")

const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
        ca : fs.readFileSync('/home/ubuntu/rds_cert/rds-ca-2019-root.pem')
    }
  },
  // operatorsAliases: false,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models.users")(sequelize, Sequelize);
db.books = require("./models.books")(sequelize, Sequelize);
db.carts = require("./models.carts")(sequelize, Sequelize);
db.bookimages = require("./models.bookimages")(sequelize, Sequelize);

module.exports = db;
