import { vi } from "vitest";

const promiseFn = vi.fn().mockResolvedValue(true);

// Functions names to be mocked with a basic resolve function
const fnKeys = [
  "show",
  "close",
  "hide",
  "maximize",
  "minimize",
  "setFocus",
  "isMaximized",
];

vi.mock("@tauri-apps/api/window", () => {
  let r = {};
  for (let k of fnKeys) {
    Object.assign(r, { [k]: promiseFn });
  }
  return {
    getCurrentWindow: () => r,
  };
});
