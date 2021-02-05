const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//load models
const Course = require('./models/Courses');
const { constants } = require('buffer');

//connect to database

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
//READ THE JSON FILE
const courses = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//Import to Data
const importData = async () => {
	try {
		await Course.create(courses);
		console.log('Data imported');
		process.exit(1);
	} catch (err) {
		console.log(err);
	}
};

const deleteData = async () => {
	try {
		await Course.deleteMany();
		console.log('Data is deleted');
		process.exit(1);
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
