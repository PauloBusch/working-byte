const { Obj } = require('../utils/content/dataResult.js');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateUserCommand } = require('../models/users/commands/createUserCommand');

const controllerUser = { };

controllerUser.getAll = async (req, res) => {
    
};

controllerUser.getById = async (req, res) => {    
    
};

controllerUser.create = async (req, res) => {
    const command = Obj.getData(new CreateUserCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
};

controllerUser.update = async (req, res) => {
    
};

controllerUser.delete = async (req, res) => {
    
};

module.exports = {
    ControllerUser: controllerUser
};