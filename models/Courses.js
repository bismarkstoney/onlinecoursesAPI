const mongoose = require('mongoose');
const slugify = require('slugify');

const geocoder = require('../utils/geocoder');
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
	location: {
		type: {
			type: String,
			enum: ['Point'],
		},
		coordinates: {
			type: [Number],
			indexe: '2dsphere',
		},
		formattedAddress: String,
		city: String,

		state: String,
		zipcode: String,
		country: String,
	},
	slug: String,
	address: {
		type: String,
	},
	price: {
		type: Number,
	},
	instructor: {
		type: String,
	},
	Students: {
		type: String,
	},
	courseType: {
		type: String,
	},
	playlist: {
		type: [Array],
	},
	rating: {
		type: String,
	},
	comments: {
		type: String,
	},
});

//create a slug from the title
CouserSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

//GEOCODE and create location field
CouserSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.address);
	this.location = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};

	// Do not save address in DB
	this.address = undefined;
	next();
});
module.exports = mongoose.model('Courses', CouserSchema);
