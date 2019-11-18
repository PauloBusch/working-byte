const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetEquipmentQuery } = require('../models/equipment/queries/getEquipmentQuery');
const { ListEquipmentQuery } = require('../models/equipment/queries/listEquipmentQuery');
const { ListTypeQuery } = require('../models/equipment/queries/listTypesQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateEquipmentCommand } = require('../models/equipment/commands/createEquipmentCommand');
const { UpdateEquipmentCommand } = require('../models/equipment/commands/updateEquipmentCommand');
const { RemoveEquipmentCommand } = require('../models/equipment/commands/removeEquipmentCommand.js');

const { Obj } = require('../utils/content/dataResult');

const controllerEquipment = { }

controllerEquipment.getById = async (req, res) => {
    const query = Obj.getData(new GetEquipmentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipment.getAll = async (req, res) => {
    const query = Obj.getData(new ListEquipmentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipment.getAllTypes = async (req, res) => {
    const query = Obj.getData(new ListTypeQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEquipment.create = async (req, res) => {
    const command = Obj.getData(new CreateEquipmentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEquipment.update = async (req, res) => {
    const command = Obj.getData(new UpdateEquipmentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEquipment.remove = async (req, res) => {
    const command = Obj.getData(new RemoveEquipmentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerEquipment: controllerEquipment
}
