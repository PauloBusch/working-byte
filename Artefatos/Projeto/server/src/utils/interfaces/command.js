const { TokenData } = require('./tokenData');

class Command extends TokenData {
    async HasPermission(){ }
    async GetError(){ }
    async Execute(){ }
}

module.exports = {
    Command
}