const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');
const dbmodel = require('./dbdeb_tube');

let app = express();
app.use(cors());
// Session setup
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true
}));

// Flash middleware
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/videos');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } // 5 MB limit
});

// Handle file upload with error handling
app.post('/upload/done', (req, res) => {
    upload.single('file')
    (req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                req.flash('error', 'File size too large! Maximum allowed size is 5 MB.');
                return res.redirect('/upload');
            }
            req.flash('error', 'An error occurred while uploading the file.');
            return res.redirect('/upload');
        } else if (err) {
            req.flash('error', 'An unexpected error occurred.');
            return res.redirect('/upload');
        }

        // If no errors, proceed with saving the file info to the database
        let newvideo = await dbmodel.create({
            title: req.body.title,
            video: req.file.originalname
        });
        console.log(req.file.originalname);
        res.redirect('/');
    });
});

// Route to render home page
app.get('/', async (req, res) => {
    console.log("hi");
    let data = await dbmodel.find();
    res.render('deb_tube', { videos: data });
});

// Route to delete a video
app.get('/delete/:id', async (req, res) => {
    let videoid = req.params.id;
    await dbmodel.deleteOne({ _id: videoid });
    res.redirect('/');
});

// Route to render upload page
app.get('/upload', (req, res) => {
    const errorMessage = req.flash('error');
    res.render('upload', { error: errorMessage });
});

// Start the server
app.listen(3003, '0.0.0.0',() => {
    console.log('Running on port 3003...');
});
