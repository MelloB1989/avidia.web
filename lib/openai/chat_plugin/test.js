const ai_completion = require("./gpt_3.5_turbo_completion.js");
const test = async () => {
const r = await ai_completion("Hi, I am KArtik");
console.log(r);
}
test();