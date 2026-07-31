import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #1e3c72, #2a5298);
                        color: #f4f7ff;
                    }
                    .container {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.18);
                        border-radius: 16px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
                        padding: 32px;
                        text-align: center;
                        max-width: 420px;
                        width: 90%;
                    }
                    h1 {
                        margin-bottom: 16px;
                        font-size: 28px;
                    }
                    p {
                        margin-bottom: 24px;
                        line-height: 1.6;
                    }
                    button {
                        background: #ff9a3c;
                        border: none;
                        border-radius: 999px;
                        color: #1a1a1a;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 700;
                        padding: 14px 32px;
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    }
                    button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Paytm Webhook</h1>
                    <p>Make a payment using the webhook endpoint at <strong>/paytm</strong>.</p>
                    <form action="/paytm/payment" method="POST">
                        <button type="submit">Pay</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

app.post("/paytm/payment", (req, res) => {
    const orderId = crypto.randomUUID();
    res.status(302).redirect(`http://127.0.0.1:3333/paytm?orderId=${orderId}&amount=100`);
});

app.get("/success", (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #2d3748, #4a5568);
                        color: #edf2f7;
                    }
                    .message-card {
                        background: rgba(255, 255, 255, 0.08);
                        border: 1px solid rgba(255, 255, 255, 0.16);
                        border-radius: 20px;
                        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
                        padding: 40px 32px;
                        max-width: 520px;
                        width: 90%;
                        text-align: center;
                        backdrop-filter: blur(12px);
                    }
                    h1 {
                        margin: 0 0 16px;
                        font-size: 2.4rem;
                        letter-spacing: 0.03em;
                    }
                    p {
                        margin: 0;
                        line-height: 1.8;
                        font-size: 1.05rem;
                        color: #e2e8f0;
                    }
                    .badge {
                        display: inline-block;
                        margin-bottom: 24px;
                        padding: 10px 18px;
                        background: rgba(255, 255, 255, 0.12);
                        border-radius: 999px;
                        font-size: 0.9rem;
                        color: #cbd5e0;
                        text-transform: uppercase;
                        letter-spacing: 0.12em;
                    }
                </style>
            </head>
            <body>
                <div class="message-card">
                    <div class="badge">Paytm Webhook</div>
                    <h1>Payment Received</h1>
                    <p>Your payment has been received successfully via Paytm and your order has been placed.</p>
                </div>
            </body>
        </html>
    `);
});

app.post("/webhook/paytm/payment", (req, res) => {
    const { amount } = req.body;
    console.log(`Received payment of amount: ${amount}`);
    res.send("Success");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});