import { Children, ReactNode } from "react";
import { Translate_text } from "./translate";

export function Translate_children(children: ReactNode): ReactNode {
  if (typeof children === "string") {
    return Translate_text(children);
  }
  if (!Array.isArray(children)) {
    return children;
  }
  let hasText = false;
  for (const child of children) {
    if (typeof child === "string" && child.trim().length > 0) {
      hasText = true;
      break;
    }
  }
  if (!hasText) {
    return children;
  }
  return Children.map(children, (child) => (typeof child === "string" ? Translate_text(child) : child));
}
