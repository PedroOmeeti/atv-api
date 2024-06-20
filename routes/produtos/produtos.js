const express = require('express')
const router = express.Router()
const db = require('../../banco')
const bodyParser = require('body-parser')
const validar = require('../../func/funcoes')

router.use(bodyParser.json())
router.use(function (req, res, next) {    
  res.setHeader('Access-Control-Allow-Origin', '*');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');    
  res.setHeader('Access-Control-Allow-Headers', '*');    
  res.setHeader('Access-Control-Allow-Credentials', true);    
  next();
})

// ROTAS GET

router.get('/listar', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    console.log(req.headers['Authorization'])
    res.json({"mensagem": "Token inválido ou informado."})

  }else{
    db.query('SELECT * FROM produtos', function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

router.get('/buscar/nome/:nome', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('SELECT * FROM produtos WHERE nome LIKE CONCAT(\'%\', ?, \'%\')', [req.params.nome], function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

router.get('/buscar/fabricante/:fabricante', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('SELECT * FROM produtos WHERE fabricante LIKE CONCAT(\'%\', ?, \'%\')', [req.params.fabricante], function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

// DELETAR
router.get('/remover/:id', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('DELETE FROM produtos WHERE id = ?', [req.params.id], function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

// ROTAS POST

// CADASTRAR
router.post('/cadastrar', function(req, res) {
  db.query('INSERT INTO produtos (nome, fabricante, estoque, cod_barras, preco) VALUES (?, ?, ?, ?, ?)', [req.body.nome, req.body.fabricante, req.body.estoque, req.body.cod_barras, req.body.preco], function (erro, resultado) {
    if(erro) {
      res.json({erro})
    } else {
      res.json({resultado})
    }
  })
})

// MODIFICAR
router.post('/modificar/:id', function(req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('UPDATE produtos SET nome=?, fabricante=?, estoque=?, cod_barras=?, preco=? WHERE id=?', [req.body.nome, req.body.fabricante, req.body.estoque, req.body.cod_barras, req.body.preco, req.params.id], function (erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})



module.exports = router