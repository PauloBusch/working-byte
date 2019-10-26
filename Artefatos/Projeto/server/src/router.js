const router = require('express').Router();
const { Token } = require('./utils/auth/authJwt');

const { ControllerUser } = require('./controllers/users.controller');
const { ControllerAuth } = require('./controllers/auth.controller');
const { ControllerEvaluation } = require('./controllers/evaluations.controller');
const { ControllerEquipament } = require('./controllers/equipament.controller');

router.post('/login', ControllerAuth.login);
router.get('/logout', ControllerAuth.logout);

router.get('/users', Token.validate, ControllerUser.getAll);
router.get('/users/:id', Token.validate, ControllerUser.getById);
router.post('/users', Token.validate, ControllerUser.create);
router.put('/users/:id', Token.validate, ControllerUser.update);
router.delete('/users/:id', Token.validate, ControllerUser.delete);

router.get('/evaluations', Token.validate, ControllerEvaluation.getAll);
router.get('/evaluations/:id', Token.validate, ControllerEvaluation.getById);
router.post('/evaluations', Token.validate, ControllerEvaluation.create);
router.put('/evaluations/:id', Token.validate, ControllerEvaluation.update);
router.delete('/evaluations/:id', Token.validate, ControllerEvaluation.remove);

// router.post('/equipment', Token.validate, ControllerEquipament.create);

module.exports = {
    Router: router
}