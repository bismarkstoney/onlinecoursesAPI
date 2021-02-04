const NodeGeocoder = require('node-geocoder');
const dontenv = require('dotenv');
dontenv.config({ path: './config/config.env' });
const options = {
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
