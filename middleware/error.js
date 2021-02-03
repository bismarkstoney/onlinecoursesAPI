const erroHandlers = (err, req, res, next) => {
	console.log(err.stack);
	res.send(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Server error',
	});
};

module.exports = erroHandlers;
