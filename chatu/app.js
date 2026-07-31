import chatuTeam, { randomChoice } from "chatujs";

console.log(chatuTeam[0]);
console.log(chatuTeam[1]);
console.log(chatuTeam[2]);

const randomMember = randomChoice(chatuTeam);
console.log(`Today's lucky star is ✨ ${randomMember}`);