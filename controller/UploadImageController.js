const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Set storage engine
// const storage = multer.diskStorage({
//   destination: './public/images',
//   filename: function(req, file, cb) {
//     const uniqueId = uuidv4();
//     cb(null, `${file.fieldname}-${Date.now()}-${uniqueId}${path.extname(file.originalname)}`);
//   }
// });

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(req, file, cb) {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueId}${ext}`;
    
    // Check if a file with the same name already exists
    fs.access('./public/images/' + filename, (err) => {
      if (!err) {
        // File with the same name already exists, generate a new unique ID
        return storage.getFilename(req, file, cb);
      } else {
        // File name is unique, save the file
        return cb(null, filename);
      }
    });
  },
  getFilename: function(req, file, cb) {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueId}${ext}`;
    
    // Call the callback function with the new filename
    cb(null, filename);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 5); // 'images' is the fieldname for the uploaded files and 10 is the maximum number of files

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.uploadImages = async (req, res) => {
  try {
    // Call the `upload` function to handle the file upload
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        // If upload is successful, return the file paths in the response
        const filepaths = req.files.map((file) => file.path);
        return res.status(200).json({ message: 'Images uploaded successfully', filepaths });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
