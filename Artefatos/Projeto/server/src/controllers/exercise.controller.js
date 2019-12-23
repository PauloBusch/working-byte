const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetExerciseQuery } = require('../models/exercise/queries/getExerciseQuery');
const { GetExerciseTrainingQuery } = require('../models/exercise/queries/getExerciseTrainingQuery');
const { ListExerciseQuery } = require('../models/exercise/queries/listExerciseQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateExerciseCommand } = require('../models/exercise/commands/createExerciseCommand');
const { UpdateExerciseCommand } = require('../models/exercise/commands/updateExerciseCommand');
const { RemoveExerciseCommand } = require('../models/exercise/commands/removeExerciseCommand.js');

const { Obj } = require('../utils/content/dataResult');

const controllerExercise = { }

controllerExercise.getById = async (req, res) => {
    const query = Obj.getData(new GetExerciseQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerExercise.getByIdTraining = async (req, res) => {
    const query = Obj.getData(new GetExerciseTrainingQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerExercise.getAll = async (req, res) => {
    const query = Obj.getData(new ListExerciseQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}


controllerExercise.create = async (req, res) => {
    const command = Obj.getData(new CreateExerciseCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerExercise.update = async (req, res) => {
    const command = Obj.getData(new UpdateExerciseCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerExercise.delete = async (req, res) => {
    const command = Obj.getData(new RemoveExerciseCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerExercise: controllerExercise
}