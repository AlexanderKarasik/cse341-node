const validator = require('../helpers/validate');

const savePlayer = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "position": "required|string|min:3 ",
        "country": "required|string",
        "birthday": "string",
        "joined": "string",
        "debut": "string"
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
savePlayer
};