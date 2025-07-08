export const DataTransform = {
  addValues: (a, b) => {
    if (typeof a === number && typeof b === number) return a + b;
    if (typeof a === "string" || typeof b === "string")
      return String(a) + String(b);
    throw new Error("Incompatible Types");
  },
  stringifyValue: (value) => {
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return String(value);
  },
  invertBoolean: (boolean) => {
    if (typeof value !== "boolean") throw new Error("Incorrect Type");
    return !value;
  },
};
