const mongoose = require('mongoose');
const CouserSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: [true, 'Title must be unique'],
		required: [true, 'Title is required'],
		trim: true,
		maxlength: [250, 'Ttitle can exce 25 characters long'],
		minlength: [10, 'Title can be less than 10 chararcters'],
	},
	videos: [Array],
});

module.exports = mongoose.model('Courses', CouserSchema);
