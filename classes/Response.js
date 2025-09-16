class Response {

    generateResponseTrue(res, msg, data) {
        res.status(200).json({msg: msg, data: data});
    }

    generateResponseFalse(res, msg, log, nError, tError = '') {
        res.status(nError).json({msg: msg});
        console.error(log, tError ?? undefined);
    }
}


export default Response;