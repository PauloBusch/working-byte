const routes = require('express').Router();
const { User } = require('../utils/sequelize');

//Listar todos
routes.get('/users', (req, res) => {
    User.findAll().then((result) => res.json(result)).err;
});

//Buscar pelo id
routes.get('/users/:id', async (req, res) => {
    
});

//Criar usuário
routes.post('/users', async (req, res) => {
    // const user = await User.create(req.body);
    // res.json(user);
});

//Atualizar
routes.put('/users/:id', async (req, res) => {
    
});

//Remover
routes.delete('/users/:id', async (req, res) => {

});

module.exports = routes;