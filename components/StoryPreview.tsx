import React from "react";

export function StoryPreview({ storyId }: { storyId: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL || "http://localhost:6006";
  const src = `${baseUrl}/iframe.html?id=${storyId}`;

  return (
    <div style={{ margin: "1em 0", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
      <iframe src={src} width="100%" height="300" style={{ border: "none" }} />
    </div>
  );
}