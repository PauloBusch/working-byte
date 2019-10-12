//======= DEPENDÊNCIAS ========
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const { Router } = require('./router');
const { AppConfig } = require('./../config');
const { TestConnection } = require('./utils/database/connection');

//========== MAIN =============
dotenv.config({ path: 'assets/.env' });
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(Router);   

const state = async (call) => {
  return await TestConnection.test(async state => {
      var msg = `
          API Server WorkingByte Works <br/>
          Server Time______: ${new Date()}<br/>
          Db WorkingByte___: ${state}<br/>
          Server Port______: ${AppConfig.port}<br/>
      `;
      await call(msg);
  });
};

app.get('/',async (req, res) => { 
  await state(state => res.send(state));
});
state(state => console.log(state));
app.listen(AppConfig.port);
