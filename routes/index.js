// File Type: API endpoint

const express = require('express');

// This router starts the render process.
const router = express.Router();

// This returns the frontend components.
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
