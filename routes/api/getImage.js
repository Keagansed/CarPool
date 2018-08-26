// File Type: API endpoint

const express = require('express');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// This router handles the retrival and reconstrution of an image stored in the DB.
const router = express.Router(); 

// Mongo URI
const mongoURI = 'mongodb://localhost/carpool';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs as a global variable
let gfs;

// Sets up the grid file storage after the mongo connection is established.
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// This method gets an image from the GFS colections in the DB.
// Parameters: 
//      filename: String;  is the name of the image to be retrieved.
// Return Value:
//      Response containing: 
//          err: String; Contains the error message.
//          or
//          readstream: bitStream; the data of the image.
router.get('/', (req, res, next) => {
	gfs.files.findOne({ filename: req.query.filename }, (err, file) => {
		// Check if file
		if(!file || file.length === 0) {
			return res.send({
				success: false,
				message: 'File error: No file exists',
			});
		}
		// Check if image
		if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
			// Read output to browser
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		}else{
			return res.send({
				success: false,
				message: 'File error: Not an image',
			});
		}
	});
});

module.exports = router;


