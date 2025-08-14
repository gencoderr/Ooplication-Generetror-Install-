
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTasksFromGoal = async (goal: string): Promise<{ title: string; description: string }[]> => {
  if (!API_KEY) {
    throw new Error("API key is not configured. Cannot use AI features.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following high-level goal, break it down into a list of smaller, actionable tasks. For each task, provide a clear title and a brief one-sentence description. Goal: "${goal}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The concise title of the task."
              },
              description: {
                type: Type.STRING,
                description: "A brief, one-sentence description of the task."
              }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const generatedTasks = JSON.parse(jsonText);
    
    if (!Array.isArray(generatedTasks)) {
        throw new Error("AI response was not in the expected format.");
    }

    return generatedTasks;

  } catch (error) {
    console.error("Error generating tasks with Gemini:", error);
    throw new Error("Failed to generate tasks using AI. Please check your prompt or API key.");
  }
};
