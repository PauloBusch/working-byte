const { QueryResult, EErrorCode, Obj } = require('./../content/dataResult');

const QueryHandle  = {
    Execute: async (query) => {
        Obj.printData(query, 'tokenData');
        const error = await query.GetError();
        if (error != null)
            return new QueryResult(0, undefined, error.ErrorCode, error.Message);

        const hasPermission = await query.HasPermission();
        if (!hasPermission)
            return new QueryResult(0, undefined, EErrorCode.Unauthorized, "No has permission to run query");

        try{
            return await query.Execute();
        }catch(err){
            console.log(err);
            return new QueryResult(0, undefined, EErrorCode.Fail, "Error executing query");
        }
    } 
}

module.exports = {
    QueryHandle
}