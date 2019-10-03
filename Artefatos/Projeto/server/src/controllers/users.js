const routes = require('express').Router();
const { User } = require('./../models/user');

//Listar todos
routes.get('/users', async (req, res) =>{
    
});

//Buscar pelo id
routes.get('/users/:id', async (req, res) => {
    
});

//Criar usuário
routes.post('/users', async (req, res) => {

});

//Atualizar
routes.put('/users/:id', async (req, res) => {

});

//Remover
routes.delete('/users/:id', async (req, res) => {

});

module.exports = routes;