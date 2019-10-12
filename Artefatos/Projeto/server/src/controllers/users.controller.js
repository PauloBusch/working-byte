const { Obj } = require('../utils/content/dataResult.js');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateUserCommand } = require('../models/users/commands/createUserCommand');
const { UpdateUserCommand } = require('../models/users/commands/updateUserCommand');
const { RemoveUserCommand } = require('../models/users/commands/removeUserCommand');

const controllerUser = { };

controllerUser.getAll = async (req, res) => {
    
};

controllerUser.getById = async (req, res) => {    
    const query = Obj.getData(new GetUserQuery(), req);
    const result = await QueryHanfle.Execute(query);
    res.json(result);
};

controllerUser.create = async (req, res) => {
    const command = Obj.getData(new CreateUserCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
};

controllerUser.update = async (req, res) => {
    const command = Obj.getData(new UpdateUserCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
};

controllerUser.delete = async (req, res) => {
    const command = Obj.getData(new RemoveUserCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
};

module.exports = {
    ControllerUser: controllerUser
};