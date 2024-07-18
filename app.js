const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed'));
//     }
//   };

//   const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
//   });

const upload = multer({
  storage: storage
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload-success.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
