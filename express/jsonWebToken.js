import jwt from 'jsonwebtoken';

let secretKey = "This is a secret key";

let token = jwt.sign({ data: 'example' }, secretKey, { expiresIn: '1h' });
console.log("Generated Token:", token);

let decodedToken = jwt.verify(token, secretKey);
console.log("Decoded Token:", decodedToken);
