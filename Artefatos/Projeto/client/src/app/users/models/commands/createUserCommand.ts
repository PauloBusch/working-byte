export class CreateUserCommand {
    public id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public address: string;
    public phone: string;
    public cpf: string;
    public age: number;
    public is_personal: boolean;
    public sexo: string;
    public login: string;
    public password: string;

    constructor(
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        address: string,
        phone: string,
        cpf: string,
        age: number,
        is_personal: boolean,
        sexo: string,
        login: string,
        password: string
    ) {
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
}