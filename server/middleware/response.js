module.exports = function (response, statusCode, statusMessage, result) {
	console.log(result);
    response.json({
        "status": statusMessage,
        "result": result
    });
};