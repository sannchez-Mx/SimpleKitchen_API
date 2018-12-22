const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) =>{
    const token = req.headers['x-access-token'];
    if(!token) return res.status(403).json({msg: "No hay Token"});
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err) return res.status(403).json({err, msg:"Expiro tu Token"});
        req.user = await User.findById(decoded.id);
        next();
    })
};