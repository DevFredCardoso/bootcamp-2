import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

fs.cpSync('src', dist, { recursive: true });

const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });
archive.directory(dist, false);
archive.pipe(output);
await archive.finalize();

console.log('✅ Extensão empacotada em dist/extension.zip');
