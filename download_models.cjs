const https = require('https');
const fs = require('fs');
const path = require('path');

const models = [
  'sofa_02', 'sofa_03', 'armchair_01', 'fancy_court_chair_01', 'wooden_table_02', 'chandelier_03'
];
const modelsDir = path.join(__dirname, 'public', 'models');
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
  });
}

async function fetchModel(name) {
  return new Promise((resolve) => {
    https.get(`https://api.polyhaven.com/files/${name}`, async (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          const gltfData = json.gltf['1k'];
          const dir = path.join(modelsDir, name);
          
          console.log(`Downloading ${name}...`);
          
          // Download includes (bin and textures)
          for (const [relativePath, info] of Object.entries(gltfData.include)) {
            const destPath = path.join(dir, relativePath);
            await download(info.url, destPath);
          }
          
          // Download main gltf
          const gltfDest = path.join(dir, `${name}.gltf`);
          await download(gltfData.url, gltfDest);
          
          console.log(`Finished ${name}`);
          resolve();
        } catch (e) {
          console.error(`Error processing ${name}:`, e);
          resolve();
        }
      });
    });
  });
}

async function run() {
  for (const m of models) await fetchModel(m);
  console.log("All done!");
}
run();
