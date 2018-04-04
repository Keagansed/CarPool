const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const User = require('../../models/User.js');

var router = express.Router(); 

// Mongo URI
const mongoURI = 'mongodb://localhost/carpool';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res, next) => {
   //~ res.json({ file: req.file });
	const query = {'_id': req.body.id};
	User.findOneAndUpdate(query, {$set:{profilePic: req.file.filename}}, {upsert:true}, function(err, doc){
		if (err) 
			return res.send(500, { error: err });
	});
	res.redirect('/');
});

module.exports = router;