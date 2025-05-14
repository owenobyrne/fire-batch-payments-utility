const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const yaml = require('js-yaml');

const APP_VERSION = require('../package.json').version;
const DIST_DIR = path.resolve(__dirname, '../out/make/zip/darwin/x64'); // adjust if using arm64 or universal
const FILE_PREFIX = 'Fire.Batch.Payments.Utility-darwin-x64'; // adjust to your actual app name
const FILE_NAME = `${FILE_PREFIX}-${APP_VERSION}-mac.zip`;
const FILE_PATH = path.join(DIST_DIR, FILE_NAME);

async function generateYml() {
  if (!fs.existsSync(FILE_PATH)) {
    console.error(`❌ ZIP file not found at: ${FILE_PATH}`);
    process.exit(1);
  }

  const fileBuffer = await fs.readFile(FILE_PATH);
  const sha512 = crypto.createHash('sha512').update(fileBuffer).digest('base64');

  const ymlData = {
    version: APP_VERSION,
    files: [
      {
        url: FILE_NAME,
        sha512
      }
    ],
    path: FILE_NAME,
    sha512,
    releaseDate: new Date().toISOString()
  };

  const ymlPath = path.join(DIST_DIR, 'latest-mac.yml');
  await fs.writeFile(ymlPath, yaml.dump(ymlData));

  console.log(`✅ latest-mac.yml created at: ${ymlPath}`);
}

generateYml().catch(err => {
  console.error(err);
  process.exit(1);
});
