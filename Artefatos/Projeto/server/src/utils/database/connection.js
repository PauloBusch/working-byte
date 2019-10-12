
const { Connection } = require('./../../mapping');

class TestConnection {
     async test(call) {
        await Connection.authenticate()
            .then(async () => await call('authenticated'))
            .catch(async (err) => { 
                await call('error');
                throw err;
            });
    }
}
    
module.exports = {
    TestConnection: new TestConnection()
}