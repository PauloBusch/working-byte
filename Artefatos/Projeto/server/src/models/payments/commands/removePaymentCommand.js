const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode, Obj } = require('../../../utils/content/dataResult');
const { PaymentsDb } = require('../../../mapping');
const { Payment } = require('../payment');

class RemovePaymentCommand extends Command {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await PaymentsDb.count({ where: { id: this.id, removed: false } });
        if (!exists)
            return new Error(EErrorCode.NotFound, `Payment with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { where: { id: this.id } };
        const paymentDb = await PaymentsDb.findOne(query);
        const payment = Obj.cast(new Payment(), paymentDb);
        payment.remove();

        const result = await PaymentsDb.update(payment, query);
        return new CommandResult(result ? 1 : 0);
    }
} 

module.exports = {
    RemovePaymentCommand
}