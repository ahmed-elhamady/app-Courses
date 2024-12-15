class AppError extends Error {
    constructor (){
        super();
    };

    createErr(status, statusCode, message){
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        return this;
    }
}

module.exports = new AppError();