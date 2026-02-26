// Run TypeScript type-checking on the whole project when TS/TSX files are staged.
// tsc doesn't support per-file mode, so we ignore the file list and check the project.
// ESLint is excluded here due to a transitive dependency conflict (math-intrinsics/abs.js)
// that will be resolved when eslint-config-next updates its peer dependencies.
module.exports = {
  "*.{ts,tsx}": () => "npx tsc --noEmit",
};
