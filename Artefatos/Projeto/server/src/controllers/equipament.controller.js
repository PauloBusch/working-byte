const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetEquipamentQuery } = require('../models/equipament/queries/getEquipamentQuery');
const { ListEquipamentQuery } = require('../models/equipament/queries/listEquipamentQuery');
const { ListTypeQuery } = require('../models/equipament/queries/listTypesQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateEquipamentCommand } = require('../models/equipament/commands/createEquipamentCommand');
const { UpdateEquipamentCommand } = require('../models/equipament/commands/updateEquipamentCommand');
const { RemoveEquipamentCommand } = require('../models/equipament/commands/removeEquipamentCommand.js');

const { Obj } = require('../utils/content/dataResult');

const controllerEquipament = { }

controllerEquipament.getById = async (req, res) => {
    const query = Obj.getData(new GetEquipamentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipament.getAll = async (req, res) => {
    const query = Obj.getData(new ListEquipamentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipament.getAllTypes = async (req, res) => {
    const query = Obj.getData(new ListTypeQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipament.create = async (req, res) => {
    const command = Obj.getData(new CreateEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEquipament.update = async (req, res) => {
    const command = Obj.getData(new UpdateEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEquipament.remove = async (req, res) => {
    const command = Obj.getData(new RemoveEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerEquipament: controllerEquipament
}