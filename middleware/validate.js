const validator = require('../helpers/validate');

const saveTask = async (req, res, next) => {
    const validationRule = {
        "taskName": "required|string",
        "taskInitiator": "required|string",
        "taskStartdate": "required",
        "responsiblePerson": "required|string",
        "taskDeadline": "required|string",
        "taskOutcome": "required|string",
        "assignedTeam": "required|string"
    };


await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        next();
    }
}).catch( err => console.log(err))
}

const saveTeam = async (req, res, next) => {
    const validationRule = {
        "teamName": "required|string",
        "teamMembers": "required|string",
        "teamLeader": "required",
        "teamProfile": "required|string",
        "dateCreated": "required",
    };


await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        next();
    }
}).catch( err => console.log(err))
}



module.exports = {
saveTask,
saveTeam
};