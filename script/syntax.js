const fs = require("fs");
const path = require("path");
const languages = ["ddlog-dat", "ddlog-dl"];

function inPath(language) {
  return path.resolve(".", "out", "contributes", "grammars", language);
}

function outPath(language) {
  return path.resolve(".", "contributes", "grammars", `${language}.json`);
}

for (const language of languages) {
  const from = inPath(language);
  const into = outPath(language);
  const data = require(from);
  const json = JSON.stringify(data.default, null, 2);
  fs.writeFileSync(into, json);
}
