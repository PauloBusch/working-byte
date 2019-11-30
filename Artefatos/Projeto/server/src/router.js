const router = require('express').Router();
const { Token } = require('./utils/auth/authJwt');

const { ControllerUser } = require('./controllers/users.controller');
const { ControllerAuth } = require('./controllers/auth.controller');
const { ControllerEvaluation } = require('./controllers/evaluations.controller');
const { ControllerEquipment } = require('./controllers/equipment.controller');
const { ControllerDiet }= require('./controllers/diet.controller');
const { ControllerPayment } = require('./controllers/payment.controller');
const { ControllerCalendar} = require('./controllers/calendar.controller');
const { ControllerTraining} = require('./controllers/training.controller');

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

router.get('/equipmentsTypes', Token.validate, ControllerEquipment.getAllTypes);
router.get('/equipments', Token.validate, ControllerEquipment.getAll);
router.get('/equipments/:id', Token.validate, ControllerEquipment.getById);
router.post('/equipments', Token.validate, ControllerEquipment.create);
router.put('/equipments/:id', Token.validate, ControllerEquipment.update);
router.delete('/equipments/:id', Token.validate, ControllerEquipment.remove);

router.get('/dietTypes', Token.validate, ControllerDiet.getAllTypes);
router.get('/diets', Token.validate, ControllerDiet.getAll);
router.get('/diets/:id', Token.validate, ControllerDiet.getById);
router.post('/diets', Token.validate, ControllerDiet.create);
router.put('/diets/:id', Token.validate, ControllerDiet.update);
router.delete('/diets/:id', Token.validate, ControllerDiet.remove);

router.get('/payments', Token.validate, ControllerPayment.getAll);
router.get('/payments/:id', Token.validate, ControllerPayment.getById);
router.post('/payments', Token.validate, ControllerPayment.create);
router.put('/payments/:id', Token.validate, ControllerPayment.update);
router.delete('/payments/:id', Token.validate, ControllerPayment.remove);

router.get('/calendars/trainings', Token.validate, ControllerTraining.getAll);
router.get('/calendars', Token.validate, ControllerCalendar.getAll);
router.get('/calendars/:id', Token.validate, ControllerCalendar.getById);
router.post('/calendars', Token.validate, ControllerCalendar.create);
router.put('/calendars/:id', Token.validate, ControllerCalendar.update);
router.delete('/calendars/:id', Token.validate, ControllerCalendar.delete);

router.get('/training', Token.validate, ControllerTraining.getAll);
router.get('/training/:id', Token.validate, ControllerTraining.getById);
router.post('/training', Token.validate, ControllerTraining.create);
router.put('/training/:id', Token.validate, ControllerTraining.update);
router.delete('/training/:id', Token.validate, ControllerTraining.delete);

module.exports = {
    Router: router
}
