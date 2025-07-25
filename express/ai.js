import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "welcome";

async function generateContentHandler(prompt) {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        // return result.response.text();
    } catch (error) {
        console.log(error);
    }
}

generateContentHandler("What is javascript");


