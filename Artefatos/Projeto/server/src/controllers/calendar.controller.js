const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetCalendarQuery } = require('../models/calendar/queries/getCalendarQuery');
const { ListCalendarQuery } = require('../models/calendar/queries/listCalendarQuery');

const { CommandHandle } = require('../utils/handle/commandHandle');
const { CreateCalendarCommand } = require('../models/calendar/commands/createCalendarCommand');
const { UpdateCalendarCommand } = require('../models/calendar/commands/updateCalendarCommand');
const { RemoveCalendarCommand } = require('../models/calendar/commands/removeCalendarCommand.js');

const { Obj } = require('../utils/content/dataResult');

const controllerCalendar = { }

controllerCalendar.getById = async (req, res) => {
    const query = Obj.getData(new GetCalendarQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerCalendar.getAll = async (req, res) => {
    const query = Obj.getData(new ListCalendarQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}


controllerCalendar.create = async (req, res) => {
    const command = Obj.getData(new CreateCalendarCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerCalendar.update = async (req, res) => {
    const command = Obj.getData(new UpdateCalendarCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerCalendar.remove = async (req, res) => {
    const command = Obj.getData(new RemoveCalendarCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerCalendar: controllerCalendar
}