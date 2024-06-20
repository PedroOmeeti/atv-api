const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const db = require('../../banco')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const validar = require('../../func/funcoes')

router.use(bodyParser.json())

// 

// ROTAS GET

router.get('/listar', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('SELECT * FROM usuarios', function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

router.get('/listar/:id', function (req, res) {
  if(validar(req.headers['authorization']) == false){
    res.json({"mensagem": "Token inválido ou informado."})
  }else{
    db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], function(erro, resultado) {
      if(erro) {
        res.json({erro})
      } else {
        res.json({resultado})
      }
    })
  }
})

router.get('/protegido', function(req, res){
  if(validar(req.headers['authorization']) == false){
      res.json({"mensagem": "Token inválido ou informado."})
  }else{
      // Se der certo:
      const infos = validar(req.headers['authorization'])
      res.json({infos})
  }
})



// ROTAS POST



// CADASTRAR
router.post('/cadastrar', function(req, res) {
  const pass = crypto.createHash('md5').update(req.body.senha).digest("hex")
  console.log(pass)
  db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [req.body.nome, req.body.email, pass], function (erro, resultado) {
    if(erro) {
      res.json({erro})
    } else {
      res.json({resultado})
    }
  })
})

// LOGIN

router.post('/login', function(req, res) {
  const email = req.body.email
  // Obter o hash da senha:
  const senha = crypto.createHash('md5').update(req.body.senha).digest('hex')
  db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], function(erro, resultado) {
    if(erro) {
      res.json({"mensagem": "Falha!", "dberro": {erro} })

    } else {
      // Verificar se a senha está incorreta:
      if(resultado.length == 0) {
        res.json({"mensagem": "Usuario ou senha inválidos"})

      } else {
        // Construir payload:
        const payload = {
          id: resultado[0]['id'],
          nome: resultado[0]['nome'],
          senha: resultado[0]['senha'],
          email: resultado[0]['email']
        }
        // Criar o token e "assinar" o pacote:
        const token = jwt.sign(payload, process.env.JWT_SEGREDO, {expiresIn: '1h'})
        // Enviar o token ao usuário:
        res.json({"token": token})
      }
    }
  })
})



module.exports = router