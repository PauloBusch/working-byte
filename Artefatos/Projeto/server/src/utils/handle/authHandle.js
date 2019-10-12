const { AuthResult, EErrorCode, Obj } = require('./../content/dataResult');

const AuthHandle = {
    Execute: async (command) => {
        Obj.printData(command, 'tokenData');
        const error = await command.GetError();
        if (error != null)
            return new AuthResult(false, undefined, undefined, error.ErrorCode, error.Message);

        try{
            return await command.Execute();
        }catch(err){
            console.log(err);
            return new AuthResult(false, undefined, undefined, EErrorCode.Fail, "Error executing command");
        }
    } 
}

module.exports = {
    AuthHandle
};