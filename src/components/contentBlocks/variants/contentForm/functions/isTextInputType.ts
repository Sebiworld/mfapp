export const isTextInputType = (type: string): boolean =>
  ["input", "text", "number", "textarea", "email"
  ].includes(
    type
  );
