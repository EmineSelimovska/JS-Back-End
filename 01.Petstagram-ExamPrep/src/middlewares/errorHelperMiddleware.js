const {errMessages} = require('../utils/errorHelper');

module.exports = (err, req, res, next) => {
    const errorMessages = errMessages(err);

    res.render('404', { errorMessages });
}