// Cutom application error class.
// Takes in a message and a status code as input and outputs a minimal error.

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;