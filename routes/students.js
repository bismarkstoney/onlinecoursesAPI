const express = require('express');
const router = express.Router();

const { createStudent } = require('../controllers/students');

router.route('/').post(createStudent);

module.exports = router;
