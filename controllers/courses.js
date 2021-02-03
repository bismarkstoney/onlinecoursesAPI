const Courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');

//@desc  Create a course
//@route POST /api/v1/courses
//@acess Private
exports.createCourse = async (req, res, next) => {
	try {
		const courses = await Courses.create(req.body);
		res.status(200).json({
			success: true,
			data: courses,
			msg: 'Course created',
			success: true,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

//@desc  Get all courses
//@route GET /api/v1/courses/
//@acess Public
exports.getAllCourses = async (req, res, next) => {
	try {
		const course = await Courses.find({});
		res.status(201).json({
			results: course.length,
			data: course,
			success: true,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

//@desc  Get all courses
//@route GET /api/v1/courses?/:id
//@acess Public

exports.getCourse = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
};

//@desc  Update a course
//@route PUT /api/v1/courses/:id
//@acess Private
exports.updateCourse = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
};

//@desc  Delete a course
//@route DELETE /api/v1/courses/:id
//@acess Private
exports.deleteCourse = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(
			new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
		);
	}
};
