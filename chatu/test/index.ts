import chatuTeam, { randomInt, randomChoice } from "chatujs";

console.log(chatuTeam[0]);
console.log(chatuTeam[1]);
console.log(chatuTeam[2]);

const randomMember = randomChoice(chatuTeam);
console.log(`Today's lucky star is ✨ ${randomMember}`);

console.log(randomInt(1, 1000));
console.log(randomChoice(["pop", "push", "enqueue"]));
