'use strict';

var mongoose = require('mongoose'),
	Contact = mongoose.model('Contact');
module.exports = function (MeanStarter, app) {
	app.route('/api/contact')
		.post(function (req, res) {
			if (req.isAuthenticated()) {
				var contact = new Contact(req.body);
				contact.save(function (err) {
					if (err) {
						return res.send(err);
					}
					res.json({
						success: true,
						message: "Contact created"
					});
				});
			}
		})
	app.route('/api/contact/:contact_id')
		.delete(function (req, res) {
			if (req.isAuthenticated()) {
				Contact.remove({_id: req.params.contact_id}, function (err, contact) {
					if (err) res.send(err);

					res.json({
						success: true,
						message: "Successfuly deleted"
					});
				});
			}
		})
		.get(function (req, res) {
			if (req.isAuthenticated()) {
				Contact.find({user:  req.params.contact_id}, function (err, contacts) {
					if (err) res.send(err);

					res.json(contacts);
				})
			}
		});
};