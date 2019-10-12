const { TokenData } = require('./tokenData');

class Query extends TokenData {
    async HasPermission(){ }
    async GetError(){ }
    async Execute(){ }
}

module.exports = {
    Query
}