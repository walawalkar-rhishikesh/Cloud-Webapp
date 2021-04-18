module.exports = {
    HOST: process.env.app_db_hostname || "localhost",
    USER: process.env.db_instance_username || "root",
    PASSWORD: process.env.db_instance_password || "302809rtghyujk",
    DB: process.env.app_db_name || "webapp",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    AWS_ACCESS_KEY_ID : process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY : process.env.AWS_SECRET_ACCESS_KEY,
    aws_region : process.env.aws_region,
    AWS_BUCKET_NAME: process.env.s3_bucket_name
  };