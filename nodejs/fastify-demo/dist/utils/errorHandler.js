"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setErrorHandler(app) {
    app.setErrorHandler((error, request, reply) => {
        console.log(error.message, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        reply.status(409).send({
            message: error.message
        });
    });
}
exports.default = setErrorHandler;
//# sourceMappingURL=errorHandler.js.map