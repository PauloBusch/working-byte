const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetEquipamentQuery } = require('../models/equipament/queries/getEquipamentQuery');
const { ListEquipamentQuery } = require('../models/equipament/queries/listEquipamentQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateEquipamentCommand } = require('../models/equipament/commands/createEquipamentCommand');
const { UpdateEquipamentCommand } = require('../models/equipament/commands/updateEquipamentCommand');
const { RemoveEquipamentCommand } = require('../models/equipament/commands/removeEquipamentCommand.js');

const { Obj } = require('../utils/content/dataResult');

const equipamentController = { }

equipamentController.getById = async (req, res) => {
    const query = Obj.getData(new GetEquipamentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

equipamentController.getAll = async (req, res) => {
    const query = Obj.gatDate(new ListEquipamentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

equipamentController.create = async (req, res) => {
    const command = Obj.getData(new CreateEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

equipamentController.update = async (req, res) => {
    const command = Obj.getDate(new UpdateEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

equipamentController.remove = async (req, res) => {
    const command = Obj.getData(new RemoveEquipamentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    EquipamentController: equipamentController
}