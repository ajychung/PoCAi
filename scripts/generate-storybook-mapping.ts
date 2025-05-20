import fs from "fs";
import axios from "axios";

const STORYBOOK_URL = process.env.STORYBOOK_URL || "http://localhost:6006";

interface Story {
  id: string;
  name: string;
  kind: string;
}

async function fetchStories(): Promise<Record<string, Story>> {
  const res = await axios.get(\`\${STORYBOOK_URL}/stories.json\`);
  return res.data.stories;
}

async function main() {
  const stories = await fetchStories();
  const entries = Object.values(stories).map(s => ({
    id: s.id,
    name: s.name,
    kind: s.kind,
    url: \`\${STORYBOOK_URL}/iframe.html?id=\${s.id}\`
  }));

  fs.writeFileSync("public/storybook-mapping.json", JSON.stringify(entries, null, 2));
  console.log("✅ Generated storybook-mapping.json");
}

main();