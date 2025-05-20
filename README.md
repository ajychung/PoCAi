# Next.js UI Generator

This app:
- Parses UI designs from screenshots (via GPT or Google Vision OCR)
- Extracts and maps components from Figma
- Generates TSX code automatically

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