import axios from "axios";

export async function parseScreenshotWithOCR(base64Image: string): Promise<any[]> {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;
  const res = await axios.post(
    \`https://vision.googleapis.com/v1/images:annotate?key=\${apiKey}\`,
    {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: "TEXT_DETECTION" }]
        }
      ]
    }
  );

  const text = res.data.responses[0].fullTextAnnotation?.text || "";
  const lines = text.split("\n").map(t => t.trim()).filter(Boolean);
  return lines.map((line, idx) => ({
    type: "text",
    props: { children: line },
    id: idx
  }));
}