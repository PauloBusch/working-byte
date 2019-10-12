const { EntityBase } = require('../../utils/database/entityBase');

class User extends EntityBase {
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
        super(id);
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
}

module.exports = {
    User
}