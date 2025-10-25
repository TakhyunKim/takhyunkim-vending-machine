export function generateUuid(key: string = "default") {
  return `${key}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}
