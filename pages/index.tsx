import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<any[]>([]);
  const [tsx, setTsx] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const res = await fetch("/api/parse-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "screenshot", base64 }),
      });
      const data = await res.json();
      setParsed(data.elements || []);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-ui", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ elements: parsed }),
    });
    const data = await res.json();
    setTsx(data.tsx);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js UI Generator</h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={!file}>Parse Image</button>
      <button onClick={handleGenerate} disabled={parsed.length === 0}>Generate TSX</button>

      {parsed.length > 0 && (
        <>
          <h2>Parsed Elements</h2>
          <pre>{JSON.stringify(parsed, null, 2)}</pre>
        </>
      )}
      {tsx && (
        <>
          <h2>Generated TSX</h2>
          <pre style={{ background: "#eee", padding: 12 }}>{tsx}</pre>
        </>
      )}
    </div>
  );
}