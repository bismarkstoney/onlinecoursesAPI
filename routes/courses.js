const express = require('express');
const router = express.Router();

const {
	createCourse,
	getAllCourses,
	getCourse,
	updateCourse,
	deleteCourse,
	getCoursesInRadius,
	getCoursesInCity,
} = require('../controllers/courses');
router.route('/radius/:zipcode/:distance').get(getCoursesInRadius);
router.route('/:city').get(getCoursesInCity);
router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').put(updateCourse).delete(deleteCourse).get(getCourse);

module.exports = router;
