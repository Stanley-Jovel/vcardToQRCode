'use strict';

var mongoose = require('mongoose'),
	Schema	 = mongoose.Schema;

var ContactSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	lastname: String,
	org: String,
	title: String,
	tel: String,
	email: String,
	url: String,
	contact: String,
	street: String,
	city: String,
	state: String,
	zip: String,
	country: String,
	qrdata: String
});

mongoose.model('Contact', ContactSchema);