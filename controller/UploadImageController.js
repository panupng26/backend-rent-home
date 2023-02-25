const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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
