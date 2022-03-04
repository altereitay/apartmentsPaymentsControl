const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'No token'})
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    }catch (err){
        res.status(401).json({msg:'Token not valid'});
    }
}