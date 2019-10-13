const { AuthResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Command } = require('../../../utils/interfaces/command');
const { Token, TokenData } = require('../../../utils/auth/authJwt');
const { Auth } = require('../../../utils/auth/authUser');

const { UserData } = require('../view_models/userData');
const { UserDb } = require('../../../mapping');

class AuthUserCommand extends Command {
    constructor(
        login,
        password
    ){
        super();
        this.login = login;
        this.password = password;
    }

    async GetError(){
        if (!this.login)
            return new Error(EErrorCode.InvalidParams, "Paramter login cannot be null");

        if (!this.password)
            return new Error(EErrorCode.InvalidParams, "Parameter password cannot be null");

        const exists = await UserDb.count({ where: { login: this.login, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFound, "User with login does not exists");

        return null;
    }

    async HasPermission(){
        // TODO: Validate with token
        return true;
    }

    async Execute(){
        const fields = [
            'id', 
            'first_name',
            'last_name',
            'email',
            'login',
            'is_personal', 
            'password'
        ];
        const query = { 
            attributes: fields, 
            where: { login: this.login, removed: false } 
        };
        const userDb = await UserDb.findOne(query);

        if (!await Auth.validate(this.password, userDb.password))
            return new AuthResult(false, undefined, undefined, EErrorCode.Fail, "Invalid password");

        const userData = new UserData(
            userDb.id,
            userDb.first_name,
            userDb.last_name,
            userDb.email,
            userDb.login,
            userDb.is_personal
        );
        this.tokenData = new TokenData(
            userDb.id,
            userDb.is_personal
        );

        const token = await Token.generate(this.tokenData);
        return new AuthResult(true, token, userData);
    }
}

module.exports = {
    AuthUserCommand
}