// Imports
// ========================================================
import createCache from "@emotion/cache";

// Main Cache Config
// ========================================================
export function createEmotionCache() {
  return createCache({ key: "css" });
}
