import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseScreenshotWithGPT(base64Image: string): Promise<any[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this UI screenshot and list components with type and text/label."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 1000
  });

  try {
    const content = response.choices[0].message.content || "";
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("GPT parse failed", err);
    return [];
  }
}