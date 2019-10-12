const bcrypt = require('bcrypt');

const Auth = {    
    validate: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },
    encrypt: async (password) => {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = {
    Auth
}