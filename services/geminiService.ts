import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAbsenceCallScript = async (
  workerName: string,
  reason?: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: API Key missing.";

  try {
    const prompt = `
      You are an automated labor management assistant for 'HandyHub'.
      A worker named ${workerName} is absent today.
      Generate a polite but firm message script to send or say to them.
      Ask why they didn't come and what happened.
      Provide the response in three formats clearly separated:
      1. English
      2. Spanish
      3. Hindi
      Keep it professional.
      ${reason ? `Context regarding potential reason: ${reason}` : ''}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Failed to generate script.";
  } catch (error) {
    console.error("Error generating call script:", error);
    return "Error communicating with Gemini.";
  }
};

export const editWorkSiteImage = async (
  imageBase64: string,
  prompt: string
): Promise<string | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    // Clean the base64 string if it contains the header
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image", // Specific model for editing/generation
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: "image/png", // Assuming PNG for simplicity, though the API handles standard types
              data: cleanBase64,
            },
          },
        ],
      },
    });

    // Check response parts for image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                 return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
        }
    }
    
    console.warn("No image found in response", response);
    return null;

  } catch (error) {
    console.error("Error editing image:", error);
    return null;
  }
};

export const suggestWorkers = async (
  category: string,
  location: string
): Promise<string> => {
    const ai = getClient();
    if (!ai) return "Unable to fetch suggestions.";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Suggest 3 fictional worker profiles for the '${category}' category near '${location}'. 
            Format as a JSON array of objects with keys: name, experience, rate.
            Do not include markdown formatting.`
        });
        return response.text || "";
    } catch (e) {
        return "";
    }
}

export const improveWorkerProfile = async (
  name: string,
  category: string,
  currentBio: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key missing.";
  
  try {
     const prompt = `You are a professional career consultant for manual laborers and tradespeople.
     Write a short, engaging, and trustworthy bio for a worker profile on 'HandyHub'.
     
     Worker Name: ${name}
     Job Category: ${category}
     Current Draft/Notes: "${currentBio}"
     
     The bio should be encouraging to potential employers, highlight reliability, and be under 60 words.`;
     
     const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: prompt
     });
     return response.text || currentBio;
  } catch (e) {
    console.error("Error improving bio:", e);
    return currentBio;
  }
};