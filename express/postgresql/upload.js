import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Create Supabase client with service role key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

app.get("/", (req, res) => {
    res.send(`
        <form action="/upload" method="POST" enctype="multipart/form-data"><input type="file" name="file" /><button type="submit">upload</button></form>`);
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        // const userId = req.body.userId;
        const userId = "debottam";
        console.log(req.file);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { data, error } = await supabase.storage
            .from('images')
            .upload(`${file.originalname}`, file.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.mimetype
            });

        if (error) throw error;

        res.json({ success: true, file: data });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
});

// If your bucket is public:

app.get("/image", (req, res) => {
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl('output1.png');

    console.log(data.publicUrl);
    res.redirect(data.publicUrl);
});

app.listen(3333, () => console.log('Server running on http://localhost:3333'));
