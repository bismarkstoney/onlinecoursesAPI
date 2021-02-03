exports.createCourse = (req, res, next) => {
	res.status(200).json({
		msg: 'Course created',
		success: true,
	});
};

exports.getAllCourses = (req, res, next) => {
	res.status(200).json({
		msg: 'All courses',
		success: true,
	});
};

exports.getCourse = (req, res, next) => {
	res.status(200).json({
		msg: `The course with ${req.params.id} `,
		success: true,
	});
};

exports.updateCourse = (req, res, next) => {
	res.status(200).json({
		msg: `The course with ${req.params.id} was updated `,
		success: true,
	});
};

exports.deleteCourse = (req, res, next) => {
	res.status(200).json({
		msg: `The course with ${req.params.id} was deleted `,
		success: true,
	});
};
