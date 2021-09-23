const jwt = require('jsonwebtoken')
const logger = require('./logger')

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
  if(token == null) {
    return next()
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  request.user = decodedToken.id ? decodedToken.id : null

  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}
