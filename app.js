const express = require('express');
const dontenv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/db');
const coursesRouter = require('./routes/courses');
const connectDB = require('./config/db');
dontenv.config({ path: './config/config.env' });

//initial the app
const app = express();

const PORT = process.env.PORT || 3000;

//connect databse
connectDB();
//using the morgan middle
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//moubt the routes
app.use('/api/v1/courses', coursesRouter);
app.listen(PORT, () => {
	console.log(`The server is listing on ${PORT}`);
});
