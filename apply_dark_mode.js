const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "frontend/src");

const replacements = {
  "bg-white": "bg-white dark:bg-slate-900",
  "bg-slate-50": "bg-slate-50 dark:bg-slate-800",
  "bg-slate-100": "bg-slate-100 dark:bg-slate-800/50",
  "text-slate-900": "text-slate-900 dark:text-white",
  "text-slate-800": "text-slate-800 dark:text-slate-100",
  "text-slate-700": "text-slate-700 dark:text-slate-200",
  "text-slate-600": "text-slate-600 dark:text-slate-300",
  "text-slate-500": "text-slate-500 dark:text-slate-400",
  "border-slate-100": "border-slate-100 dark:border-slate-700",
  "border-slate-200": "border-slate-200 dark:border-slate-700",
  "border-white": "border-white dark:border-slate-800",
  "bg-indigo-50": "bg-indigo-50 dark:bg-indigo-900/30",
  "text-indigo-600": "text-indigo-600 dark:text-indigo-400",
};

function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let originalContent = content;

      // Ensure we don't duplicate replacements if they already exist
      for (const [key, value] of Object.entries(replacements)) {
        // Regex to match the exact class name not followed by " dark:"
        // We use a negative lookahead to prevent double replacing.
        const regex = new RegExp(`\\b${key}\\b(?!\\s+dark:)`, "g");
        content = content.replace(regex, value);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log("Done applying dark mode classes!");
