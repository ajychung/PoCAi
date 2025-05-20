import axios from "axios";

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

export async function fetchFigmaFile(fileKey: string, figmaToken: string): Promise<FigmaNode[]> {
  const res = await axios.get(\`https://api.figma.com/v1/files/\${fileKey}\`, {
    headers: {
      'X-Figma-Token': figmaToken
    }
  });

  const document = res.data.document;
  const nodes: FigmaNode[] = [];

  function extractComponents(node: any) {
    if (node.type === "TEXT" || node.type === "BUTTON" || node.type === "FRAME") {
      nodes.push({
        id: node.id,
        name: node.name,
        type: node.type,
        children: node.children
      });
    }
    if (node.children) {
      node.children.forEach(extractComponents);
    }
  }

  extractComponents(document);
  return nodes;
}