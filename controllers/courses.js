const Courses = require('../models/Courses');
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

exports.getCourse = async (req, res, next) => {
	try {
		const course = await Courses.findById(req.params.id);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: `Data not found`,
			});
		}
		res.status(200).json({
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

exports.updateCourse = async (req, res, next) => {
	try {
		const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!course) {
			return res.status(404).json({
				success: false,
				message: `Data not found`,
			});
		}
		res.status(200).json({
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

exports.deleteCourse = async (req, res, next) => {
	try {
		const course = await Courses.findByIdAndDelete(req.params.id);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: `Data not found`,
			});
		}
		res.status(200).json({
			message: 'record deleted',
			success: true,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};
