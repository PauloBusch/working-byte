const { CommandHandle } = require('..//utils/handle/commandHandle');
const { CreatePaymentCommand } = require('../models/payments/commands/createPaymentCommand');

const { Obj } = require('../utils/content/dataResult');

const controllerPayment = { };

controllerPayment.create = async (req, res) => {
    const command = Obj.getData(new CreatePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerPayment: controllerPayment
}