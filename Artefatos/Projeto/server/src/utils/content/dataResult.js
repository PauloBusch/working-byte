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

const EErrorCode = {
    None: 0,
    InvalidParams: 1,
    DuplicateUnique: 2,
    NotAllowedCommad: 3,
    NotFound: 4,
    Fail: 5,
    Unauthorized: 6,
    Forebiden: 7
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

class AuthResult {
    constructor(
        auth,
        token,
        user,
        errorCode,
        message
    ){
        this.Auth = auth;
        this.Token = token;
        this.User = user,
        this.Message = message;
        this.ErrorCode = errorCode || EErrorCode.None;
    }
}

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