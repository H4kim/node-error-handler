'use strcit';

const codeValidator = require('./src/codeValidator');
const status = require('./src/httpMessages');

module.exports = env => {
  const production = env === 'production';

  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const statusCode = codeValidator(err.status) || 500;
    const code = err.code || statusCode;

    const errorHandler = {
      error: {
        code,
        message: status[statusCode],
        details: err.message,
      },
    };

    if (!production) {
      console.error(err.stack);
    }

    if (!err.message || err.message === '') {
      delete errorHandler.error.details;
    }

    return res.status(statusCode).json(errorHandler);
  };
};
