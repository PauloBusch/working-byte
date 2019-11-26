const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetDietQuery } = require('../models/diets/queries/getDietQuery');
const { ListDietQuery } = require('../models/diets/queries/listDietQuery');
const { ListDietTypesQuery } = require('../models/diets/queries/listDietTypesQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateDietCommand } = require('../models/diets/commands/createDietCommand');
const { UpdateDietCommand } = require('../models/diets/commands/updateDietCommand');
const { RemoveDietCommand } = require('../models/diets/commands/removeDietCommand');

const { Obj } = require('../utils/content/dataResult');

const controllerDiet = { }

controllerDiet.getById = async (req, res) => {
    const query = Obj.getData(new GetDietQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerDiet.getAll = async (req, res) => {
    const query = Obj.getData(new ListDietQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerDiet.getAllTypes = async (req, res) => {
    const query = Obj.getData(new ListDietTypesQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}


controllerDiet.create = async (req, res) => {
    const command = Obj.getData(new CreateDietCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerDiet.update = async (req, res) => {
    const command = Obj.getData(new UpdateDietCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerDiet.remove = async (req, res) => {
    const command = Obj.getData(new RemoveDietCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerDiet: controllerDiet
}