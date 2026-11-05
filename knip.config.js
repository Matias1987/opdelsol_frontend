export default {
  $schema: "https://unpkg.com",
  entry: ["main.tsx", "index.tsx", "src/main.tsx"],
  project: [
    "components/**/*.{ts,tsx,js,jsx}",
    "hooks/**/*.{ts,tsx,js,jsx}",
    "utils/**/*.{ts,tsx,js,jsx}",
    "pages/**/*.{ts,tsx,js,jsx}",
    "src/**/*.{ts,tsx,js,jsx}",
  ],
  paths: {
    "@/*": ["./*"],
  },
};
