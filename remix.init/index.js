const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

async function main({ rootDirectory }) {
  const ENV_PATH = path.join(rootDirectory, ".env");
  const APP_ARC_PATH = path.join(rootDirectory, "./app.arc");

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);
  const APP_NAME = DIR_NAME + "-" + SUFFIX;

  const secret = getRandomString(16);
  const env = `NODE_ENV="development"\nSESSION_SECRET="${secret}"\n`;

  const appArc = await fs.readFile(APP_ARC_PATH, "utf-8");

  await fs.writeFile(
    APP_ARC_PATH,
    appArc.replace("grunge-stack-template", APP_NAME)
  );
  await fs.writeFile(ENV_PATH, env);
}

module.exports = main;