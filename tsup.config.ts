import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  minify: "terser",
  format: ["esm"],
  clean: true,
  dts: true,
});
