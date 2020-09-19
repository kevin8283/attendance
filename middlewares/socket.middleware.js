const socketMiddleware = {
    checkSocketID: function (socket, next) {
        console.log(socket.id)

        return next()
    }
}

module.exports = {socketMiddleware}