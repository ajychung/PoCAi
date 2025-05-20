import type { NextApiRequest, NextApiResponse } from "next";
import { parseScreenshotWithGPT } from "../../lib/screenshotParserGPT";
import { parseScreenshotWithOCR } from "../../lib/screenshotParserOCR";
import { fetchFigmaFile } from "../../lib/figmaParser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, base64, figmaFileKey, figmaToken, provider = "gpt" } = req.body;

  try {
    if (type === "screenshot") {
      if (!base64) return res.status(400).json({ error: "Missing image base64" });
      const elements = provider === "ocr"
        ? await parseScreenshotWithOCR(base64)
        : await parseScreenshotWithGPT(base64);
      return res.status(200).json({ elements });
    }

    if (type === "figma") {
      if (!figmaFileKey || !figmaToken) return res.status(400).json({ error: "Missing Figma credentials" });
      const elements = await fetchFigmaFile(figmaFileKey, figmaToken);
      return res.status(200).json({ elements });
    }

    return res.status(400).json({ error: "Unsupported type" });
  } catch (err: any) {
    console.error("Parse error", err.message);
    return res.status(500).json({ error: "Internal parser error" });
  }
}