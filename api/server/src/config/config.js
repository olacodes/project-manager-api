require('dotenv').config()


module.exports = {
  "development": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD,
    "database": "project_tracker",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD,
    "database": "project_tracker_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    use_env_variable: 'DATABASE_URL'
  }
}
