/*jshint esversion: 8 */

const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const ObjectId = mongoose.Schema.Types.ObjectId;
const createId = mongoose.Types.ObjectId;
const makesalt = require('../helper/makeid');
const passwordHash = require('password-hash');
const Schema = require('../helper/schema');
const express = require('express');
const router = express.Router();
const Login = Schema.Login;
const User = Schema.User;
const Level = Schema.Level;

router.post('/createUser', async function(req, res) {
	// const { error } = validateLogin(req.body);
	
	const result = await createUser(req.body.school, req.body.schoolId, req.body.password);
	if(result) res.send('User has been successfully created.');
	else res.send('Sorry, Some error happened.');
});

router.get('/:school/:schoolId', async function(req ,res) {
	const result = await getUserInfo(school, schoolInfo);
	if (!result) return res.status(404).send('The genre with the given ID was not found.');
	res.send(result);
});

router.post('', (req, res) => {
	const { error } = validateGenres(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);
	res.send(genre);
});

function validateGenres(genre) {
	const schema = {
		name: Joi.string().min().required()
	};
	return Joi.validate(genre, schema);
}

async function createUser(school, schoolId, password, callback) {
	var userId = createId();
	var salt = makesalt();
	var hashedPassword = passwordHash.generate(password + salt);
	const login = new Login({
		_id: userId,
		school: school,
		schoolId: schoolId,
		passwordSalt: salt,
		passwordHash: hashedPassword
	});
	const userInfo = new User({
		_id: userId,
		school: school,
		schoolId: schoolId,
		courseId: []
	});

	const level = new Level({ _id: userId });
	try {
		const result1 = await login.save();
		const result2 = await userInfo.save();
		const result3 = await level.save();
		dbDebugger(result1);
		dbDebugger(result2);
		dbDebugger(result3);
		callback(true);
	}
	catch (ex) {
		dbDebugger(ex.message);
		callback(false)
	}
}
async function updateUserInfo(school, schoolId, name, title, phone, year, department, major) {
        const result = await User.update({ school: school, schoolId: schoolId }, {
	                $set: {
	                        name: name,
	                        title: title,
	                        phone: phone,
	                        year: year,
	                        department: department,
	                        major: major
	                }
	});
        dbDebugger(result);
}

async function getUserInfo(school, schoolId, callback) {
        try {
		const login = await  User.find({ school: school, schoolId: schoolId });
		callback(login);
	}
        catch(ex) {
		dbDebugger(ex.message);
	}
}

module.exports = router;
