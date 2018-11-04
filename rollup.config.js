import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: {
    format: "cjs",
    file: "index.js"
  },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
};
