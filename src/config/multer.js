const multer = require("multer");
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) callback(err);
        
        file.key = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, file.key);
      });
    },
  }),
  fileFilter: (req, file, callback) => {
    const typeFilesArray = [
      'image/pjpeg',
      'image/jpeg',
      'image/png',
      'image/gif'
    ]; 

    typeFilesArray.includes(file.mimetype) ?
    callback(null, true) :
    callback(new Error('Invalid file type. Try again.'));
  },
};