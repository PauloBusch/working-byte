const router = require('express').Router();

const { ControllerUser } = require('./controllers/users.controller');

router.get('/users', ControllerUser.getAll);
router.get('/users/:id', ControllerUser.getAll);
router.post('/users', ControllerUser.create);
router.put('/users/:id', ControllerUser.update);
router.delete('/users/:id', ControllerUser.delete);

module.exports = {
    Router: router
}