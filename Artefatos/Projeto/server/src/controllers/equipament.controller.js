const { CommandHandle } = require('../utils/handle/commandHandle');
// const { CreateEquipamentCommand } = require('../models/equipament/commands/createEquipamentCommand');

const { Obj } = require('../utils/content/dataResult');

const equipamentController = { }

equipamentController.create = async (req, res) => {
    // const command = Obj.getData(new CreateEquipamentCommand(), req);
    // const result = await CommandHandle.Execute(command);
    // res.json(result);
}

module.exports = {
    EquipamentController: equipamentController
}