import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/ha-trafiklab-departures-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    nodeResolve(),
    commonjs(),
    typescript(),
  ],
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
};
