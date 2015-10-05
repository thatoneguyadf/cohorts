var jwt = require('jsonwebtoken');
var _ = require('lodash');
var secret = process.env.JWT_SECRET;
var jwtDefaults = {};

/**
 * Sign a new token.
 *
 * @param payload
 * @param options
 */

function sign(payload, options) {

    return jwt.sign(payload, secret, _.extend(jwtDefaults, options || {}));

}

function protect(req, res, next) {

    console.log(req.headers.authorization);

    if (!req.headers.authorization) {

        return res.status(400).json({message: 'Must provide authorization token.'});

    }

    var token = req.headers.authorization.split(' ')[1];
    var decoded;

    try {

        decoded = jwt.verify(token, secret);

    } catch(err) {

        decoded = null;

    }

    if (!decoded) {

        return res.status(400).json({message: 'Could not decode user token.'});

    }

    req.user = decoded;

    next();

}

module.exports = {
    sign: sign,
    protect: protect
};