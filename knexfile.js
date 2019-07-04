module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/palettepicker",
    useNullAsDefault: true,
    migrations:{
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  test: {
    client: 'pg',
    connection: "postgres://localhost/palettepicker_test",
    useNullAsDefault: true,
    migrations:{
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};