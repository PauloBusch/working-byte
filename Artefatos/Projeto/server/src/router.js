const router = require('express').Router();
const { Token } = require('./utils/auth/authJwt');

const { ControllerUser } = require('./controllers/users.controller');
const { ControllerAuth } = require('./controllers/auth.controller');

router.post('/login', ControllerAuth.login);
router.get('/logout', ControllerAuth.logout);

router.get('/users', Token.validate, ControllerUser.getAll);
router.get('/users/:id', Token.validate, ControllerUser.getById);
router.post('/users', Token.validate, ControllerUser.create);
router.put('/users/:id', Token.validate, ControllerUser.update);
router.delete('/users/:id', Token.validate, ControllerUser.delete);

module.exports = {
    Router: router
}