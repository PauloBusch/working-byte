const { EntityBase } = require('../../utils/database/entityBase');
const { NewId } = require('../../utils/database/random');

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

    remove(){
        super.remove();
        
        //MySQL currently doesn't support conditional indexes.
        this.first_name = `${NewId()}-${this.first_name}`;//UQ_user_name
        this.last_name = `${NewId()}-${this.last_name}`;//UQ_user_name
        this.email = `${NewId()}-${this.email}`;//UQ_user_email
        this.login = `${NewId()}-${this.login}`;//UQ_user_login
    }
}

module.exports = {
    User
}