const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "",
});
const ai_completion = async (message) => {

const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    temperature: 0.2, 
            max_tokens: 150,
          messages: [
                {role: "system", content: "I am a Lisa, a AI teacher from Avidia. Avidia is AI powered LMS platform. It has AI tutors like me and cloud labs with which they can use desktop apps like VSCode, blender, android studio directly from the browser without installing it. The AI teachers are available on the left side of the screen and the cloud lab on the right. This is doubt mode so give short and to the point answers to the questions asked, if the doubt is something which needs lots of explanation(tokens) then ask the user to ask about one specific thing or to scrutinize their doubt. Also because this is doubt mode you can only answer in text and not give examples of code or syntax, only theory explanation can be given. If the user asks for code/syntax examples, tell them to switch to learn mode."},
                {role: "user", content: message}
            ]
});
//console.log(chatCompletion.choices[0]['message'].content);
//console.log(chatCompletion['usage'].total_tokens);
return {
    message: chatCompletion.choices[0]['message'].content,
    total_tokens: chatCompletion['usage'].total_tokens
}
}

//ai_completion("Hi, I am Kartik");

module.exports = ai_completion;