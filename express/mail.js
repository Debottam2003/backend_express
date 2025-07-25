import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'debsoumya60812@gmail.com',
        pass: 'tags yrqq pbxv qtrw',
    }
});


app.get('/', (req, res) => {
    res.send('<form action="/otp" method="post"><button>get otp</button></form>');
});

// Endpoint to send OTP
app.post('/otp', (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
    console.log(otp);
    // Send the email
    const mailOptions = {
        from: 'debsoumya60812@gmail.com',
        to: 'debottamkar2003@gmail.com',
        replyTo: 'debsoumya60812@gmail.com',
        subject: 'Your OTP for Password Reset',
        text: `Your OTP code is: ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
                <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 24px;">
                    <h2 style="color:rgb(7, 143, 39); text-align: center; margin-bottom: 16px;">Your OTP Code</h2>
                    <p style="font-size: 16px; color: #333; text-align: center;">Use the following OTP to proceed:</p>
                    <div style="font-size: 32px; font-weight: bold; color: #2d8cf0; background: #f0f7ff; border-radius: 6px; padding: 16px; text-align: center; letter-spacing: 6px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; color: #888; text-align: center;">This OTP is valid for a single use only.</p>
                </div>
            </div>
        `
    };

    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Transporter Configuration Error:', error.message);
        } else {
            console.log('✅ Email server is ready to send messages.');
        }
    });
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error.message);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('OTP sent successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// save the otp in a object as key-value pair against email ([email] : otp)
// and verify the otp in this way
// And normal mailing can be done too
