const Email = {
    valid: (email) => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
};

const Phone = {
    valid: (phone) => {
        var regex = /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4,5}[-\s\.]{0,1}[0-9]{4}$/;
        return regex.test(phone);
    }
};

const Cpf = {
    valid: (cpf) => {
        var regex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
        return regex.test(cpf);
    }
};

const Age = {
    valid: (age) => age > 10 && age < 100
};

const Sexo = {
    valid: (sexo) => {
        var regex = /[M,F,O]/;
        return regex.test(sexo);
    }
};

const Login = {
    valid: (login) => {
        var regex = /[a-z,A-Z]/;
        return regex.test(login);
    }
};

module.exports = {
    Email,
    Phone,
    Cpf,
    Age,
    Sexo,
    Login
}