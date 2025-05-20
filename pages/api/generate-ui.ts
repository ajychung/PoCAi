import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { getEmbedding, findBestMatches } from "../../lib/embeddings";
import { generateTSX } from "../../lib/tsxGenerator";

interface UIElement {
  type: string;
  props: Record<string, any>;
}

interface StoryComponent {
  id: string;
  name: string;
  kind: string;
  embedding: number[];
}

let storybookComponents: StoryComponent[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { elements } = req.body;

    if (!Array.isArray(elements)) {
      return res.status(400).json({ error: "elements[] required" });
    }

    if (storybookComponents.length === 0) {
      const filePath = path.resolve("./public/storybook-embeddings.json");
      const json = fs.readFileSync(filePath, "utf8");
      storybookComponents = JSON.parse(json);
    }

    const matched = await Promise.all(elements.map(async (el) => {
      const label = el.props?.children || el.props?.placeholder || "";
      const embedding = await getEmbedding(`${el.type} ${label}`.trim());
      const best = findBestMatches(embedding, storybookComponents, 1)[0];
      import { mapPropsToComponent } from '../../lib/propMapper';

      const mappedProps = mapPropsToComponent(el.type, el.props);
      return {
        name: best?.name || el.type,
        props: mappedProps
      };
    }));

    const tsx = generateTSX(matched);
    res.status(200).json({ tsx, matches: matched });
  } catch (err: any) {
    console.error("Embedding match error", err.message);
    res.status(500).json({ error: "Embedding match failed" });
  }
}