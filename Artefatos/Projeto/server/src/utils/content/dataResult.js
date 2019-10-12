const Obj = {
    getData(obj, req){
        const json = req.body;
        const parm = req.params;
        for (var prop in parm)
            json[prop] = parm[prop];
            
        return this.cast(obj, json);
    },
    cast(obj, json){
        for (var prop in obj) {
            if (json.hasOwnProperty(prop))
                obj[prop] = json[prop];
        }
        return obj;
    },
    printData(obj, hidden){        
        console.log(Obj.clone(obj, null, [hidden]));
    },
    clone(obj, remove, hidden){
        const clone = Object.assign({ }, obj);
        for (r in remove)
            delete clone[remove[r]];
        for (h in hidden){
            if (clone.hasOwnProperty(hidden[h]))
                clone[hidden[h]] = '[hidden]';
        }
        return clone;
    }
};

class Error {
    constructor(
        errorCode,
        message
    ){
        this.ErrorCode = errorCode;
        this.Message = message;
    }
};

class CommandResult {
    constructor(
        rows,
        data,
        errorCode,
        message
    ){
        this.Rows = rows;
        this.Data = data;
        this.Message = message;
        this.ErrorCode = errorCode || EErrorCode.None;
    }
};

class QueryResult {
    constructor(
        rows,
        list,
        errorCode,
        message
    ){
        this.Rows = rows;
        this.List = list || [];
        this.Message = message;
        this.ErrorCode = errorCode || EErrorCode.None;
    }
};

module.exports = {
    Obj,
    Error,
    EErrorCode,
    AuthResult,
    CommandResult,
    QueryResult
};