const code = require("./error.codes");

class newError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = code.NOT_FOUND;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = code.BAD_REQUEST;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = code.UNAUTHORIZED;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = code.FORBIDDEN;
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = code.FORBIDDEN;
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.status = code.INTERNAL_SERVER_ERROR;
    }
}

module.exports = {
    newError,
    ServerError,
    NotFoundError,
    ConflictError,
    ForbiddenError,
    BadRequestError,
    UnauthorizedError,
};
