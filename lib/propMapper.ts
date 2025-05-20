export function mapPropsToComponent(type: string, rawProps: Record<string, any>): Record<string, any> {
  switch (type) {
    case "input":
      return {
        label: rawProps.placeholder || rawProps.children,
        type: /email/i.test(rawProps.placeholder || "") ? "email" : "text"
      };
    case "button":
      return {
        children: rawProps.children || "Submit",
        variant: "primary"
      };
    case "text":
      return {
        children: rawProps.children
      };
    case "image":
      return {
        src: rawProps.src || "",
        alt: rawProps.alt || "image"
      };
    default:
      return rawProps;
  }
}