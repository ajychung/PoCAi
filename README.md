# Next.js UI Generator

This app:
- Parses UI designs from screenshots (via GPT or Google Vision OCR)
- Extracts and maps components from Figma
- Generates TSX code automatically

## 🧠 Architecture Overview

This project converts screenshots, Figma files, or text descriptions into fully functional React (TSX) pages using AI and your Storybook component library.

### ⚙️ System Flow

```
User UI (Next.js)
├── Upload Screenshot
├── Input Figma File Key & Token
└── Type UI Description
     │
     ▼
+----------------------------+
|     Parsing Layer          |
+----------------------------+
| Screenshot:                |
|   - GPT-4 Vision API       |
|   - Google Vision OCR      |
| Figma:                     |
|   - Figma REST API         |
| Text:                      |
|   - Raw component list     |
+----------------------------+
     │
     ▼
+----------------------------+
|  Unified Component Format  |
|  [ { type, props } ]       |
+----------------------------+
     │
     ▼
+----------------------------+
| Embedding & Matching       |
| - OpenAI text-embedding-3  |
| - storybook-embeddings.json|
+----------------------------+
     │
     ▼
+----------------------------+
| Prop Mapping Layer         |
| - Type-specific adjustments|
| - e.g. input → { label, type } |
+----------------------------+
     │
     ▼
+----------------------------+
| TSX Code Generator         |
| - Generates React layout   |
+----------------------------+
     │
     ▼
+----------------------------+
| Output & Preview           |
| - View TSX Code            |
| - Live Preview via react-live |
| - Preview Storybook iframe |
+----------------------------+
```

---

### 🔍 Example Output

```tsx
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default function GeneratedUI() {
  return (
    <div>
      <TextInput label="Email" type="email" />
      <Button variant="primary">Login</Button>
    </div>
  );
}
```



## Setup

1. Create `.env.local` with your API keys:

```
OPENAI_API_KEY=your-openai-key
GOOGLE_VISION_API_KEY=your-vision-key
FIGMA_API_TOKEN=your-figma-token
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

4. Regeneration script 
```
export OPENAI_API_KEY=your-api-key
export STORYBOOK_URL=http://localhost:6006

npx tsx scripts/generate-storybook-embeddings.ts
```

