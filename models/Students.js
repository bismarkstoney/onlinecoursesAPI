const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
	},
});

module.exports = mongoose.model('Students', StudentSchema);
