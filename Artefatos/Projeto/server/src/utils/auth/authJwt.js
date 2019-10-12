const { AuthResult, EErrorCode } = require('./../../utils/content/dataResult');
const { AppConfig } = require('./../../../config');

const jwt = require('jsonwebtoken');

class TokenData {
    constructor(
        id_user,
        is_personal
    ){
        this.id_user = id_user;
        this.is_personal = is_personal;
    }
}

const Token = {
    generate: async (tokenData) => {
        return await jwt.sign(
            { data: tokenData }, 
            process.env.SECRET, 
            { expiresIn: AppConfig.expirationToken }
        );
    },
    validate: async (req, res, next) => {
        const token = req.headers['access-token'];
        if(!token){
            const result = new AuthResult(false, undefined, undefined, EErrorCode.Forebiden, 'Invalid token');
            res.status(401).send(result);
            return;
        }
        const callback = async (success, tokenData) => {
            if (!success){
                const result = new AuthResult(false, undefined, undefined, EErrorCode.Forebiden, 'Failed to authenticate token.');
                res.status(500).send(result);
                return;
            }
            req.body.tokenData = tokenData;
            next();
        };

        await Token.decode(token, callback);
    },
    decode: async (token, callback) => {
        jwt.verify(token, process.env.SECRET, async (error, decoded) => {
            if (error){
                await callback(false);
                return;
            }
            
            const { data } = decoded;
            await callback(true, new TokenData(
                data.id_user, 
                data.is_personal 
            ));
        });
    }
};

module.exports = {
    Token,
    TokenData
}