import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "mutton recipe in html format";

async function generateContentHandler(prompt) {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text().replace(/\*+/g, ""));
        // return result.response.text();
    } catch (error) {
        console.log(error);
    }
}

generateContentHandler(prompt);


