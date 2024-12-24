import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
		},
		// colors: {
		// 	primary: "#006147",
		// 	secondary: "#008878",
		// 	accent: "#88F1B0",
		// 	neutral: "#FAF7F0",
		// 	white: "#FFFFFF",
		// 	grey: "#CACACA",
		// 	black: "#343434",
		// },
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#006147",

					"primary-content": "#faf7f0",

					secondary: "#008878",

					"secondary-content": "#000605",

					accent: "#88f1b0",

					"accent-content": "#06140b",

					neutral: "#e88c13",

					"neutral-content": "#faf7f0",

					"base-100": "#faf7f0",

					"base-200": "#d9d7d1",

					"base-300": "#bab7b2",

					"base-content": "#ffffff",

					info: "#0394DE",

					"info-content": "#000c16",

					success: "#16a34a",

					"success-content": "#000a04",

					warning: "#eab308",

					"warning-content": "#160d00",

					error: "#dc2626",

					"error-content": "#160d00",
				},
				// mytheme: {
				// 	primary: "#006147",

				// 	secondary: "#1d4ed8",

				// 	accent: "#e88c13",

				// 	neutral: "#1c1917",

				// 	"base-100": "#f3f4f6",

				// 	info: "#22d3ee",

				// 	success: "#16a34a",

				// 	warning: "#eab308",

				// 	error: "#dc2626",
				// },
			},
		],
	},
	plugins: [require("daisyui")],
};
export default config;
