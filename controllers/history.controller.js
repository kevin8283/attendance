const History = require('../models/history.model')

const historyController = {
    getHistory: async function (req, res) {
        try {
            const history = await History.find()

            return res.json(history)   
        } 
        catch(error) {
            return res.status(500).json(e.message)    
        }
    }
}

module.exports = {historyController}