import { rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";

const projectRoot = resolve(process.cwd());
const generatedDirectory = resolve(projectRoot, ".next");

if (basename(generatedDirectory) !== ".next" || dirname(generatedDirectory) !== projectRoot) {
  throw new Error(`Refusing to clean an unexpected path: ${generatedDirectory}`);
}

await rm(generatedDirectory, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
console.log("Cleared the generated Next.js cache.");
