var jwt = require('jsonwebtoken');
const JWT_SECRET = "DhyeyisGood$oy";

const fetchuser = async(req, res, next)=> {
    // GET THE USER FROM THE JWT TOKEN AND ADD ID TO REQ OBJECT
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"});
    }

    try {
        const data = await jwt.verify(token, JWT_SECRET) 
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"});
    }
}

module.exports = fetchuser;