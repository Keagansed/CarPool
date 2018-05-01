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

router.post('/profilePicture', upload.single('file'), (req, res, next) => {
	const query = {'_id': req.body.id};
	User.findOne(query,(err,user)=>{	
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		else
		{
			gfs.files.findOne({"filename":user.profilePic}, (err, file)=> {
				gfs.remove({_id:file._id, root:'uploads'},(err, gridStore)=>{
				if (err) 
				      return res.status(404).json({ err: err });
				});
			}); 
			User.findOneAndUpdate(query, {$set:{profilePic: req.file.filename}}, {upsert:true}, function(err, doc){
				if (err) 
					return res.send(500, { error: err });
			});
			res.redirect('/');
		}
	});
});

router.post('/driversLicense', upload.single('file'), (req, res, next) => {
 const query = {'_id': req.body.id};
	User.findOne(query,(err,user)=>{	
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		else
		{
			gfs.files.findOne({"filename":user.driversLicense}, (err, file)=> {
				gfs.remove({_id:file._id, root:'uploads'},(err, gridStore)=>{
				if (err) 
				      return res.status(404).json({ err: err });
				});
			}); 
			 User.findOneAndUpdate(query, {$set:{driversLicense: req.file.filename}}, {upsert:true}, function(err, doc){
			   if (err) 
			     return res.send(500, { error: err });
			 });
			 res.redirect('/');
		}
	});

});

router.post('/IdDocument', upload.single('file'), (req, res, next) => {
  const query = {'_id': req.body.id};
	User.findOne(query,(err,user)=>{	
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		else
		{
			gfs.files.findOne({"filename":user.IdDocument}, (err, file)=> {
				gfs.remove({_id:file._id, root:'uploads'},(err, gridStore)=>{
				if (err) 
				      return res.status(404).json({ err: err });
				});
			}); 
			User.findOneAndUpdate(query, {$set:{IdDocument: req.file.filename}}, {upsert:true}, function(err, doc){
			    if (err) 
			      return res.send(500, { error: err });
			  });
			  res.redirect('/');
		}
	});
 });

router.post('/CarPic', upload.single('file'), (req, res, next) => {
  const query = {'_id': req.body.id};
	User.findOne(query,(err,user)=>{	
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		else
		{
			gfs.files.findOne({"filename":user.CarPic}, (err, file)=> {
				gfs.remove({_id:file._id, root:'uploads'},(err, gridStore)=>{
				if (err) 
				      return res.status(404).json({ err: err });
				});
			}); 
			  User.findOneAndUpdate(query, {$set:{CarPic: req.file.filename}}, {upsert:true}, function(err, doc){
			    if (err) 
			      return res.send(500, { error: err });
			  });
			  res.redirect('/');
		}
	});
 });

 router.post('/CarRegistration', upload.single('file'), (req, res, next) => {
  const query = {'_id': req.body.id};
  User.findOne(query,(err,user)=>{	
		if(err){
			return res.send({ 
				success:false,
				message:"Error: Server Error"
			});
		}
		else
		{
			gfs.files.findOne({"filename":user.CarRegistration}, (err, file)=> {
				gfs.remove({_id:file._id, root:'uploads'},(err, gridStore)=>{
				if (err) 
				      return res.status(404).json({ err: err });
				});
			}); 
			  User.findOneAndUpdate(query, {$set:{CarRegistration: req.file.filename}}, {upsert:true}, function(err, doc){
			    if (err) 
			      return res.send(500, { error: err });
			  });
			  res.redirect('/');
		}
	});
 });

module.exports = router;