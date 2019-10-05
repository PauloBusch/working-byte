const { User } = require('../utils/sequelize');
const controllerUser = { };

controllerUser.getAll = async (req, res) => {
    await User.findAll()
        .then((users) => res.json(users))
        .catch(error => res.status(500).json(error.errors));
};

controllerUser.getById = async (req, res) => {    
    const { id } = req.params;
    await User.findByPk(id)
        .then(user => res.json(user))
        .catch(error => res.status(500).json(error.errors));
};

controllerUser.create = async (req, res) => {
    await User.create(req.body)
        .then(user => res.json(user))
        .catch(error => res.status(500).json(error));
}

controllerUser.update = async (req, res) => {
    const { id } = req.params;
    await User.update(req.body, { 
        where: { id: id }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json(error.errors));
};

controllerUser.delete = async (req, res) => {
    const { id } = req.params;
    await User.destroy({
        where: { id: id }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json(error.errors));
};

module.exports = {
    controllerUser
};