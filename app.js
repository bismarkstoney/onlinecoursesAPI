const express = require('express');
const dontenv = require('dotenv');
const morgan = require('morgan');
const coursesRouter = require('./routes/courses');
const studentRouter = require('./routes/students');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
dontenv.config({ path: './config/config.env' });

//initial the app
const app = express();

const PORT = process.env.PORT || 3000;

//connect databse
connectDB();

//MIDDLEWARES
//using the morgan middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());
//error handle

//moubt the routes
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/students', studentRouter);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`The server is listing on ${PORT}`);
});
