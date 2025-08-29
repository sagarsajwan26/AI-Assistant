import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiResponse = async (command, assistantName, authorName) => {
  
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are a virtual AI assistant designed to understand general neutral language user inputs and respond exclusively in JSON format with the following structure:
{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show" | "get_date",
  "userInput": "<original User Input, except remove any mention of your own name>",
  "response": "<a short, voice-friendly reply to read aloud>"
}.
The "type" field indicates the user's intent.
if it'a factual or informational question. aur agar koi aisa question puchta hai jiska answer tunko pata hai unko bhi general category mai rakho 
When the user requests a Google or YouTube search, the "userinput" must contain only the search text relevant to that platform.
Always respond only with the JSON object, and do not include any other text or explanations.
If a user asks "Who are you?", respond with "I am ${assistantName}, a virtual assistant of ${authorName}".
If a user asks "Who created you?", respond with I am a virtual assistant created by  ${authorName}.`
  });

  const result = await model.generateContent(command);
  const response = await result.response;
  
  return response.text();
}

