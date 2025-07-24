import bcrypt from 'bcrypt';

const saltRounds = 10;

let hashedPassword = await bcrypt.hash('myPassword', saltRounds);
console.log('Hashed Password:', hashedPassword);

let isMatch = await bcrypt.compare('myPassword', hashedPassword);
console.log('Password Match:', isMatch);