

controllerEvaluation = {  }

controllerEvaluation.create = async (req, res) => {
    const command = Obj.getData(new CreateEvaluationCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerEvaluation: controllerEvaluation
}