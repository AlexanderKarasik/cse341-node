const awesomeFunction = (req, res, next) => {
    res.json('Nina Karasik');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('Super awesome person');
};

module.exports = { awesomeFunction, returnAnotherPerson };