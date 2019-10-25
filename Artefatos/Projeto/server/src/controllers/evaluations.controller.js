const { Obj } = require('../utils/content/dataResult');

const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetEvaluationQuery } = require('../models/evaluations/queries/getEvaluationQuery');
const { ListEvaluationQuery } = require('../models/evaluations/queries/listEvaluationQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateEvaluationCommand } = require('../models/evaluations/commands/createEvaluationCommand');
const { UpdateEvaluationCommand } = require('../models/evaluations/commands/updateEvaluationCommand');
const { RemoveEvaluationCommand } = require('../models/evaluations/commands/removeEvaluationCommand');

controllerEvaluation = {  }

controllerEvaluation.getAll = async (req, res) => {
    const query = Obj.getData(new ListEvaluationQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEvaluation.getById = async (req, res) => {
    const query = Obj.getData(new GetEvaluationQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerEvaluation.create = async (req, res) => {
    const command = Obj.getData(new CreateEvaluationCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEvaluation.update = async (req, res) => {
    const command = Obj.getData(new UpdateEvaluationCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerEvaluation.remove = async (req, res) => {
    const command = Obj.getData(new RemoveEvaluationCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerEvaluation: controllerEvaluation
}