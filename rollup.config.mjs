import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
	// Build CommonJS and ESM
	{
		input: "src/index.ts", // Entry TypeScript file
		output: [
			{
				file: "build/index.cjs.js", // CommonJS output
				format: "cjs",
				sourcemap: true,
			},
			{
				file: "build/index.esm.js", // ES Module output
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			resolve(), // Resolves node_modules imports
			commonjs(), // Converts CommonJS modules to ES modules
			typescript({ tsconfig: "./tsconfig.json" }), // Uses tsconfig.json for TypeScript compilation
		],
	},
	// Generate Type Declarations
	{
		input: "src/index.ts", // TypeScript source for type declarations
		output: [{ file: "build/index.d.ts", format: "esm" }], // Generate .d.ts file in ESM format
		plugins: [dts()], // Uses rollup-plugin-dts to generate declaration files
	},
];
