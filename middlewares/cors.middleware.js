const corsMiddleware = {
    useCors: function(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS, UPDATE")
        res.header('Access-Control-Allow-Headers', "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")
        next()
    }
}

module.exports = {corsMiddleware}