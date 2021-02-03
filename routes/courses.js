const express = require('express');
const router = express.Router();

const {
	createCourse,
	getAllCourses,
	getCourse,
	updateCourse,
	deleteCourse,
} = require('../controllers/courses');

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').put(updateCourse).delete(deleteCourse).get(getCourse);

module.exports = router;
