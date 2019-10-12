class UserData {
    constructor(
        id,
        first_name,
        last_name,
        email,
        login,
        is_personal
    ){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.login = login;
        this.is_personal = is_personal;
    }
}

module.exports = {
    UserData
}