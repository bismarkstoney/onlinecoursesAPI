const Students = require('../models/Students');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.createStudent = asyncHandler(async (req, res, next) => {
	const student = await Students.create(req.body);
	res.status(200).json({
		success: true,
		data: student,
		msg: 'Course created',
		success: true,
	});
});
