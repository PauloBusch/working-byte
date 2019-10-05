class ErrorCode {
    None = 0;
    InvalidParams = 1;
    NotAllowedCommad = 2;
    NotFound = 3;
};

class CommandResult {
};

class QueryResult {
};

module.exports = {
    CommandResult,
    QueryResult,
    ErrorCode
};