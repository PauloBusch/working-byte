const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetTrainingQuery } = require('../models/training/queries/getTrainingQuery');
const { ListTrainingQuery } = require('../models/training/queries/listTrainingQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateTrainingCommand } = require('../models/training/commands/createTrainingCommand');
const { UpdateTrainingCommand } = require('../models/training/commands/updateTrainingCommand');
const { RemoveTrainingCommand } = require('../models/training/commands/removeTrainingCommand.js');

const { Obj } = require('../utils/content/dataResult');

const controllerTraining = { }

controllerTraining.getById = async (req, res) => {
    const query = Obj.getData(new GetTrainingQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerTraining.getAll = async (req, res) => {
    const query = Obj.getData(new ListTrainingQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}


controllerTraining.create = async (req, res) => {
    const command = Obj.getData(new CreateTrainingCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerTraining.update = async (req, res) => {
    const command = Obj.getData(new UpdateTrainingCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerTraining.delete = async (req, res) => {
    const command = Obj.getData(new RemoveTrainingCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerTraining: controllerTraining
}