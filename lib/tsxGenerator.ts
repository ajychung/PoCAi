export function generateTSX(components: { type: string, props: any }[]): string {
  const jsx = components.map(c => {
    const props = Object.entries(c.props || {})
      .map(([k, v]) => \`\${k}={\${JSON.stringify(v)}}\`)
      .join(" ");
    return \`<\${c.type} \${props} />\`;
  }).join("\n  ");
  return \`
export default function GeneratedUI() {
  return (
    <div>
      \${jsx}
    </div>
  );
}
\`.trim();
}