module.exports = {
    AppConfig: {
        expirationToken: 43200, //12 hours
        port: 3306
    },
    DbConfig: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'workingbyte'
    },
    DbManager: {
        overrideData: false
    }
}