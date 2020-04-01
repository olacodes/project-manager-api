class AppError extends Error {
    constructor(message, statusCode, name){
        super()
        this.name = name
        this.message = message
        this.statusCode = statusCode
    }

}

module.exports = AppError