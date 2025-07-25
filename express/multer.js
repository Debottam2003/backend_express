// // Memory storage example using multer
// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';

// const app = express();

// const PORT = 3333;

// const storage = multer.memoryStorage();

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
// });

// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

// app.post('/upload', upload.single('profile'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     try {
//         // Process the file here
//         console.log(req.file);
//         console.log(`File size: ${req.file.size} bytes`);
//         console.log(`Received file: ${req.file.originalname}`);
//         console.log(req.file.buffer);
//         console.log(req.file.buffer.length);
//         fs.writeFileSync(`./public/uploads/${req.file.originalname}`, req.file.buffer);
//         console.log(`File saved as: ${req.file.originalname}`);
//         // free memory
//         req.file.buffer = null; // This is optional, but helps to free memory if the file is large
//         // Respond to the client
//         res.send(`File ${req.file.originalname} uploaded successfully.`);
//     } catch (error) {
//         console.error('Error processing file:', error);
//         res.status(500).send('Error processing file.');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// Disk storage example using multer
import express from 'express';
import multer from 'multer';

const app = express();

const PORT = 3333;

// Configure disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Here Use the original file name
        // (But not recommended for production just for development purpose)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 3MB limit
});

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/upload', upload.fields([{ name: 'wifu', maxCount: 1 }, { name: 'profile', maxCount: 1 }]), (req, res) => {
    // if (!req.file) { // for upload.single('fieldname') (fieldname in html form)
    //     return res.status(400).send('No file uploaded.');
    // }
    if (!req.files) { //  for upload.array('fieldname', maxCount) and upload.fields([{ name: 'fieldname', maxCount: 1 }, { name: 'anotherField', maxCount: 1 }])
        return res.status(400).send('No file uploaded.');
    }
    console.log(req.files);
    res.send(`Files uploaded successfully.`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// upload.single('fieldname') // for single file upload
// req.file is a object
// example:
// let req.file = 
let example1 =
{
    fieldname: 'fieldname',
    originalname: 'file.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: './public/uploads',
    filename: 'file.txt',
}

// upload.array('fieldname', 2) // for multiple files with the same field name
// req.files is an array of objects
// example:
// let req.files =
let example2 =
    [
        {
            fieldname: 'fieldname',
            originalname: 'file1.txt',
            encoding: '7bit',
            mimetype: 'text/plain',
            destination: './public/uploads',
            filename: 'file1.txt',
        },
        {
            fieldname: 'fieldname',
            originalname: 'file2.txt',
            encoding: '7bit',
            mimetype: 'text/plain',
            destination: './public/uploads',
            filename: 'file2.txt',
        }
    ]

// upload.fields([{ name: 'fieldname1', maxCount: 1 }, { name: 'fieldname2', maxCount: 2 }]) // for multiple fields with different names with different max counts
// req.files is an object with field names as keys and arrays of objects as values
// example:
// let req.files = 
let example3 =
{
    fieldname1:
        [

            {
                fieldname: 'fieldname1',
                originalname: 'file1.txt',
                encoding: '7bit',
                mimetype: 'text/plain',
                destination: './public/uploads',
                filename: 'file1.txt',

            }
        ],
    fieldname2:
        [
            {
                fieldname: 'fieldname2',
                originalname: 'file1.txt',
                encoding: '7bit',
                mimetype: 'text/plain',
                destination: './public/uploads',
                filename: 'file1.txt',
            },
            {
                fieldname: 'fieldname2',
                originalname: 'file2.txt',
                encoding: '7bit',
                mimetype: 'text/plain',
                destination: './public/uploads',
                filename: 'file2.txt',
            }
        ]
}

console.log("Example1(req.file): ", example1);
console.log("Example2(req.files): ", example2);
console.log("Example3(req.files): ", example3);