const Courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc  Create a course
//@route POST /api/v1/courses
//@acess Private
exports.createCourse = asyncHandler(async (req, res, next) => {
	const courses = await Courses.create(req.body);
	res.status(200).json({
		success: true,
		data: courses,
		msg: 'Course created',
		success: true,
	});
});

//@desc  Get all courses
//@route GET /api/v1/courses/
//@acess Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
	const course = await Courses.find({});
	res.status(201).json({
		results: course.length,
		data: course,
		success: true,
	});
});

//@desc  Get all courses
//@route GET /api/v1/courses?/:id
//@acess Public

exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Courses.findById(req.params.id);
	if (!course) {
		return next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		data: course,
		success: true,
	});
});

//@desc  Update a course
//@route PUT /api/v1/courses/:id
//@acess Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
	const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!course) {
		return next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		data: course,
		success: true,
	});
});

//@desc  Delete a course
//@route DELETE /api/v1/courses/:id
//@acess Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Courses.findByIdAndDelete(req.params.id);
	if (!course) {
		return next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		message: 'record deleted',
		success: true,
	});
});
