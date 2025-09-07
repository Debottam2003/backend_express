import chatuTeam from "chatujs";

console.log(chatuTeam[0]);
console.log(chatuTeam[1]);
console.log(chatuTeam[2]);

const randomMember = chatuTeam[Math.floor(Math.random() * chatuTeam.length)];
console.log(`Today's lucky star is ✨ ${randomMember}`);