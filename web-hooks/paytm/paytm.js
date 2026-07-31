import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/paytm', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Paytm Webhook Endpoint</title>
            <style>
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #0f2e57, #1a3c78);
                    color: #f0f4ff;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 18px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
                    padding: 36px 42px;
                    width: min(420px, 90vw);
                    text-align: center;
                    backdrop-filter: blur(10px);
                }
                h1 {
                    margin-bottom: 24px;
                    font-size: 1.9rem;
                    letter-spacing: 0.03em;
                }
                form {
                    display: grid;
                    gap: 18px;
                }
                .amount {
                    width: 100%;
                    padding: 14px 16px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.35);
                    background: rgba(255, 255, 255, 0.15);
                    color: #fff;
                    font-size: 1rem;
                }
                .amount::placeholder {
                    color: #d8e0ff;
                }
                .pay {
                    cursor: pointer;
                    border: none;
                    padding: 14px 18px;
                    border-radius: 12px;
                    background: #57b8ff;
                    color: #0f2e57;
                    font-weight: 700;
                    transition: transform 0.2s ease, background 0.2s ease;
                }
                .pay:hover {
                    transform: translateY(-2px);
                    background: #3ea3f5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Paytm Webhook Endpoint</h1>
                <form>
                    <button type="submit" class="pay">Send</button>
                </form>
            </div>
            <script>
                document.querySelector('form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    let queryParams = new URLSearchParams(window.location.search);
                    let orderId = "";
                    let amount = 0.0;
                    if (queryParams.has('orderId') && queryParams.has('amount')) {
                        orderId = queryParams.get('orderId');
                        amount = parseFloat(queryParams.get('amount'));
                    }
                    try {
                        const response = await fetch('/payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ amount, orderId }),
                        });
                        if (response.ok) {
                            const data = await response.json();
                            alert(data.message);
                            if (data.redirectUrl) {
                                window.location.href = data.redirectUrl;
                            }
                        } else {
                            alert('Payment failed. Please try again.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                    }
                });
            </script>
        </body>
        </html>
    `);
});

app.post('/payment', async (req, res) => {
    const { amount } = req.body;
    console.log(`Received payment of amount: ${amount}`);
    console.log('NPCI transaction done.');
    try {
        let response = await fetch('http://127.0.0.1:8080/webhook/paytm/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        });
        if (response.ok) {
            console.log("WebHook calling done with success");
            res.json({ message: `Payment of amount ${amount} received successfully.`, redirectUrl: 'http://127.0.0.1:8080/success' });
        } else {
            console.log("Failed");
            res.status(500).json({ message: 'Failed to process payment.' });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'An error occurred while processing payment.' });
    }
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Paytm server is running on port ${PORT}`);
});