const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('authorization-token');

    if(!token){
        return res.status(401).json({msg : 'User Not Authorized'});
    }
    try{
        const decode = jwt.verify(token, 'AES256_build75');
        console.log(decode);
        req.user = decode.id;
        next();
    }catch(err){
        return res.status(401).json({msg : 'User Token not valid'});
    }
}