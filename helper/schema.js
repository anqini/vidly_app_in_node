/*jshint esversion: 8 */

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const loginSchema = new mongoose.Schema({
	school: String,
	schoolId: String,
	passwordSalt: String,
	passwordHash: String
});

const userInfoSchema = new mongoose.Schema({
	name: { type: String, default: 'unknown' },
	school: String,
	schoolId: String,
	title: { type: String, default: 'unknown' },
	phone: { type: String, default: 'unknown' },
	year: { type: Number, default: 2019 },
	department: { type: String, default: 'unknown' },
	major: { type: String, default: 'unknown' },
	coursesId: [ ObjectId ]
});

const levelSchema = new mongoose.Schema({
	level: { type: Number, default: 0, enum: [0, 1, 2] }
});

const courseSchema = new mongoose.Schema({
	courseName: String,
	instructor: [ ObjectId ],
	student: [ ObjectId ],
	studentCapacity: Number,
	assignmentId: [ ObjectId ],
	announcementID: [ ObjectId ],
	date: { type: Date, default: Date.now },
	expireDate: Date
});

const announcementSchema = new mongoose.Schema({
	author: ObjectId,
	title: String,
	content: String,
	date: {type: Date, default: Date.now }
});

const Course = mongoose.model('Courses', courseSchema);
const Login = mongoose.model('Logins', loginSchema);
const Level = mongoose.model('Levels', levelSchema);
const User = mongoose.model('Users', userInfoSchema);
const Announcement = mongoose.model('announcement', announcementSchema);

module.exports.Course = Course;
module.exports.Login = Login;
module.exports.Level = Level;
module.exports.User = User;
module.exports.Announcement = Announcement;
