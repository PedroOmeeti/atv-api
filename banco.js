const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_BANCO,
})

// Especificar qual item será "exportado" quando for requerido em outra página:
module.exports = connection