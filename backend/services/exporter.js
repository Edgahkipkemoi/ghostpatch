import archiver from 'archiver';
import { Readable } from 'stream';

export async function generateZip(projectStructure, projectName) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks = [];
    
    archive.on('data', (chunk) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', reject);
    
    // Add files to archive
    for (const [path, content] of Object.entries(projectStructure)) {
      archive.append(content, { name: `${projectName}/${path}` });
    }
    
    archive.finalize();
  });
}
