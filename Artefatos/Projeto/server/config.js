module.exports = {
    AppConfig: {
        expirationToken: 43200, //12 hours
        port:1320
    },
    DbConfig: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'workingbyte'
    },
    DbManager: {
        overrideData: true
    }
}