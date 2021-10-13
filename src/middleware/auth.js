const jwt = require('jsonwebtoken');
const User = require('../models/user')
//-----------------------------------
const auth = async (req, res, next) => {
    console.log('testing middleware loading');
    try {
        //const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.cookies['auth_token'];
        //console.log(process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) { throw new Error();};
        //these are the variables being passed back to the route handler
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('ERROR: This action requires logging in first.');
    }
}

module.exports = auth;