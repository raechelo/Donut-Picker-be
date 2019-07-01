module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/palettepicker",
    useNullAsDefault: true,
    migrations:{
      directory: './db/migrations'
    }
  }
};