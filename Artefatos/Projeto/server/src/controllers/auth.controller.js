const { AuthUserCommand } = require('../models/users/commands/authUserCommand');
const { AuthHandle } = require('../utils/handle/authHandle');

const { Obj } = require('../utils/content/dataResult');

const controllerAuth = { };

controllerAuth.login = async (req, res) => {
    const command = Obj.getData(new AuthUserCommand(), req);
    const result = await AuthHandle.Execute(command);
    res.cookie('auth', result.Token);
    res.json(result); 
}

controllerAuth.logout = async (req, res) => {

}

module.exports = {
    ControllerAuth: controllerAuth
}