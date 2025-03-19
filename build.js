const esbuild = require("esbuild");

// Common build options
const commonConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  target: ["node18"],
  sourcemap: true,
};

// Build CommonJS version
esbuild
  .build({
    ...commonConfig,
    outfile: "dist/index.js",
    format: "cjs",
  })
  .catch(() => process.exit(1));

// Build ESM version
esbuild
  .build({
    ...commonConfig,
    outfile: "dist/index.mjs",
    format: "esm",
  })
  .catch(() => process.exit(1));
