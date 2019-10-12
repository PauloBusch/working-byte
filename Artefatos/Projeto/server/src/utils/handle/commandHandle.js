const { CommandResult, EErrorCode, Obj } = require('./../content/dataResult');

const CommandHandle = {
    Execute: async (command) => {
        Obj.printData(command, 'tokenData');
        const error = await command.GetError();
        if (error != null)
            return new CommandResult(0, undefined, error.ErrorCode, error.Message);
            
        const hasPermission = await command.HasPermission();
        if (!hasPermission)
            return new CommandResult(0, undefined, EErrorCode.Unauthorized, "No has permission to run command");

        try{
            return await command.Execute();
        }catch(err){
            console.log(err);
            return new CommandResult(0, undefined, EErrorCode.Fail, "Error executing command");
        }
    } 
}

module.exports = {
    CommandHandle
};