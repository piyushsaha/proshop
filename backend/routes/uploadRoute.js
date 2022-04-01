import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${file.originalname}_${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Helper function to check if the file type is correct
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb('Only JPG, JPEG and PNG files allowed!');
    }
}

// Upload middleware
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});


// @desc       Upload image to server and get URL
// @route      POST /api/upload
// @access     Public
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;