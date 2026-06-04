import OpenAI from "openai";

// AI instance create karna (Gemini API ko OpenAI SDK ke saath use karte hue)
const AI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Google AI Studio se mili API key
    baseURL: process.env.OPENAI_BASE_URL // Gemini ka base URL
});

export default AI;