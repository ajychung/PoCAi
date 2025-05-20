import axios from "axios";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const STORYBOOK_URL = process.env.STORYBOOK_URL || "http://localhost:6006";
const OUTPUT_PATH = path.resolve("public/storybook-embeddings.json");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getEmbedding(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text
  });
  return res.data[0].embedding;
}

async function fetchStories() {
  const { data } = await axios.get(`${STORYBOOK_URL}/stories.json`);
  return Object.values(data.stories);
}

async function main() {
  const stories = await fetchStories();

  const embeddings = await Promise.all(
    stories.map(async (story: any) => {
      const input = `${story.kind} ${story.name}`;
      const embedding = await getEmbedding(input);
      return {
        id: story.id,
        name: story.name,
        kind: story.kind,
        embedding
      };
    })
  );

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(embeddings, null, 2));
  console.log(`✅ storybook-embeddings.json written to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("❌ Failed to generate embeddings:", err);
  process.exit(1);
});