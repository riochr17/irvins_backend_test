module.exports = {

    // response ok
    ok: (response, data, code) => {
        response.status(code);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
            data: data
        }));
    },

    // response error
    error: (response, message, code) => {
        response.status(code);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
            error: {
                message: message
            }
        }));
    }
}