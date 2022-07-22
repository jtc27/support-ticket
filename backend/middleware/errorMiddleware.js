const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode) //sets the status code to res.statusCode or the default 500
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
    //stack trace only shows if it's not in production

  })
}

module.exports = {errorHandler}