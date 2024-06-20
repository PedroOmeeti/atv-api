const jwt = require('jsonwebtoken')
require('dotenv').config()



const validar = function(token){
    if(token){
        try{
            const infos = jwt.verify(token, process.env.JWT_SEGREDO)
            return infos;
        }catch(err){
            return false;
        }
    }else{
        return false;
    }
}

module.exports = validar