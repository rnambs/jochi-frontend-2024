// api/socket.io.js

const io = require('socket.io')(3007)

module.exports = function (req, res, next) {
    req.io = io
    next()
}
