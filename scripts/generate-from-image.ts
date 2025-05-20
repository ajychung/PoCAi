import fs from "fs";
import path from "path";
import { parseScreenshotWithGPT } from "../lib/screenshotParserGPT";
import { componentMap } from "../lib/mappingConfig";
import { generateTSX } from "../lib/tsxGenerator";

async function main() {
  const filePath = process.argv[2];
  const imageBuffer = fs.readFileSync(filePath);
  const base64Image = imageBuffer.toString("base64");

  const rawElements = await parseScreenshotWithGPT(base64Image);
  const mapped = rawElements.map(el => ({
    type: componentMap[el.type.toLowerCase()] || "Box",
    props: { children: el.text || el.label || "" }
  }));

  const tsx = generateTSX(mapped);
  fs.writeFileSync("GeneratedUI.tsx", tsx);
  console.log("TSX written to GeneratedUI.tsx");
}

main();