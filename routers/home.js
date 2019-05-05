const express = require('express');
const router = express();


router.get('/', (req, res) => {
	res.render('index', {title: 'My express appp', message: 'Welcome to Vidly'})
	// res.send('Welcome to Vidly!!!')
});

module.exports = router;