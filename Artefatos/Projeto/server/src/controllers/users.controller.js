const routes = require('express').Router();
const { User } = require('../utils/sequelize');

//Listar todos
routes.get('/users', async (req, res) => {
    await User.findAll()
        .then((users) => res.json(users))
        .catch(error => res.status(500).json(error.errors));
});

//Buscar pelo id
routes.get('/users/:id', async (req, res) => {    
    const { id } = req.params;
    await User.findByPk(id)
        .then(user => res.json(user))
        .catch(error => res.status(500).json(error.errors));
});

//Criar usuário
routes.post('/users', async (req, res) => {
    console.log(req.body);
    await User.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(500).json(error.errors));
});

//Atualizar
routes.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.udpate(req.body, { 
        where: { id: id }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json(error.errors));
});

//Remover
routes.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({
        where: { id: id }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json(error.errors));
});

module.exports = routes;