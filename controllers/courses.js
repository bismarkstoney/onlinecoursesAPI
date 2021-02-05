const geocoder = require('../utils/geocoder');
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
	let query;
	const reqQuery = { ...req.query };
	//fields to exclude
	const removeFields = ['select', 'sort', 'limit', 'page'];
	removeFields.forEach((param) => delete reqQuery[param]);
	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(
		/\b(gt|gte|lte|in|eq)\b/g,
		(match) => `$${match}`
	);
	console.log(queryStr);
	//Finding Resourcs
	query = Courses.find(JSON.parse(queryStr));
	//select fileds
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}
	if (req.query.sort) {
		const sorBy = req.query.sort.split(',').join(' ');
		query = query.sort(sorBy);
	} else {
		query = query.sort('-createdAt');
	}
	//Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req, query.limit, 10) || 1;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Courses.countDocuments();

	query = query.skip(startIndex).limit(limit);

	const course = await query;

	//pagination
	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}
	res.status(201).json({
		results: course.length,
		data: course,
		success: true,
		pagination,
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

//@desc  Get a course within a radius
//@route GET /api/v1/courses/:radius/:distance
//@acess Priblic
exports.getCoursesInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;

	//get lat/lng from geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	//calculate radius using radians
	//Divide dist by radius on Earth
	//Earth Radius = 3,963 mi / 6378 km
	const radius = distance / 3963;
	const courses = await Courses.find({
		location: {
			$geoWithin: {
				$centerSphere: [[lng, lat], radius],
			},
		},
	});

	res.status(200).json({
		data: courses,
		results: courses.length,
	});
});

exports.getCoursesInCity = asyncHandler(async (req, res, next) => {
	const courses = await Courses.find({ city: req.query });

	res.status(200).json({
		data: courses,
		results: courses.length,
	});
});
