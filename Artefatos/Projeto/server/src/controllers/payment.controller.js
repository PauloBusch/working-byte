const { CommandHandle } = require('..//utils/handle/commandHandle');
const { CreatePaymentCommand } = require('../models/payments/commands/createPaymentCommand');
const { UpdatePaymentCommand } = require('../models/payments/commands/updatePaymentCommand');

const { Obj } = require('../utils/content/dataResult');

const controllerPayment = { };

controllerPayment.create = async (req, res) => {
    const command = Obj.getData(new CreatePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerPayment.update = async (req, res) => {
    const command = Obj.getData(new UpdatePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerPayment: controllerPayment
}