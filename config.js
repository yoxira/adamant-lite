import fs from 'node:fs';
import path from 'node:path';

const configPath = path.resolve('./config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export { config };
