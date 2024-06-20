const express = require('express')
const app = express()
const db = require('./banco')
require('dotenv').config()


app.use(function (req, res, next) {    
  res.setHeader('Access-Control-Allow-Origin', '*');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');    
  res.setHeader('Access-Control-Allow-Headers', '*');    
  res.setHeader('Access-Control-Allow-Credentials', true);    
  next();
})

// importar meu arquivo de rotas

const router_produtos = require('./routes/produtos/produtos.js')
const router_usuarios = require('./routes/usuarios/usuarios.js')


app.use('/produtos', router_produtos)
app.use('/usuarios', router_usuarios)

app.get('/', function (req, res) {
  res.send('Bem-vindo ao sisteminha de produtos show.')

})

app.listen(process.env.PORT, function() {
  console.log('Aplicação rodando na porta: ' + process.env.PORT )
})