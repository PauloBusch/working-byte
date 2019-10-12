const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Email, Phone, Cpf, Age, Sexo, Login } = require('../../../utils/content/validators');
const { Command } = require('../../../utils/interfaces/command');
const { Auth } = require('../../../utils/auth/authUser');

const { User } = require('../user');
const { UserDb } = require('../../../mapping');

class CreateUserCommand extends Command {
    constructor(
        id,
        first_name,
        last_name,
        email,
        address,
        phone,
        cpf,
        age,
        is_personal,
        sexo,
        login,
        password
    ){
        super();
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.cpf = cpf;
        this.age = age;
        this.is_personal = is_personal;
        this.sexo = sexo;
        this.login = login;
        this.password = password;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");
            
        if (!this.first_name)
            return new Error(EErrorCode.InvalidParams, "Parameter first_name cannot be null");
            
        if (!this.last_name)
            return new Error(EErrorCode.InvalidParams, "Parameter last_name cannot be null");
            
        if (!this.email || !Email.valid(this.email))
            return new Error(EErrorCode.InvalidParams, "Parameter email is not valid");
            
        if (!this.address)
            return new Error(EErrorCode.InvalidParams, "Parameter address cannot be null");
            
        if (!this.phone || !Phone.valid(this.phone))
            return new Error(EErrorCode.InvalidParams, "Parameter phone is not valid");
            
        if (!this.cpf || !Cpf.valid(this.cpf))
            return new Error(EErrorCode.InvalidParams, "Parameter cpf is not valid");
            
        if (!this.age || !Age.valid(this.age))
            return new Error(EErrorCode.InvalidParams, "Parameter age is not valid");
            
        if (this.is_personal == null || this.is_personal == undefined)
            return new Error(EErrorCode.InvalidParams, "Parameter is_personal cannot be null");
            
        if (!this.sexo || !Sexo.valid(this.sexo))
            return new Error(EErrorCode.InvalidParams, "Parameter sexo is not valid");
            
        if (!this.login || !Login.valid(this.login))
            return new Error(EErrorCode.InvalidParams, "Parameter login is not valid");
            
        if (!this.password)
            return new Error(EErrorCode.InvalidParams, "Parameter password cannot be null");

        const exists = await UserDb.count({ where: { first_name: this.first_name, last_name: this.last_name, removed: false } });
        if (exists)
            return new Error(EErrorCode.DuplicateUnique, `User with first_name: ${this.first_name} and last_name: ${this.last_name} already exists`);
    }

    async HasPermission(){
        // TODO: Validate with token
        return true;
    }

    async Execute(){
        const user = new User(
            this.id,
            this.first_name,
            this.last_name,
            this.email,
            this.address,
            this.phone,
            this.cpf,
            this.age,
            this.is_personal,
            this.sexo,
            this.login,
            await Auth.encrypt(this.password)
        );

        const result = await UserDb.create(user);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateUserCommand
}