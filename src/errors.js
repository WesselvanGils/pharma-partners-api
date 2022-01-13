class EntityNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'EntityNotFoundError'
    }
}

function validation(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: err.message
        })
    } else {
        next(err)
    }
}

function cast(err, req, res, next) {
    if (err.name === 'CastError') {
        res.status(400).json({
            message: `Invalid resource id: ${err.value}`
            // message: err
        })
    } else {
        next(err)
    }
}

function entityNotFound(err, req, res, next) {
    if (err.name === 'EntityNotFoundError') {
        res.status(404).json({
            message: err.message
        })
    } else {
        next(err)
    }
}

module.exports = {
    EntityNotFoundError,
    handlers: [
        validation,
        cast,
        entityNotFound,
    ],
}