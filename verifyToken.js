const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({message:'Access Denied: No sneakers inside Dude !'})

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        //next()
    }catch(err) {
        res.status(400).send({message:'Invalid Token'})
    }
}

// module.exports = auth

