import { existsSync, lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function isDirectory(path: string) {
  return existsSync(path) && lstatSync(path).isDirectory();
}

export function readdir(path: string, recursive = false) {
  const directoryContent = readdirSync(path);

  if (!recursive) return directoryContent;

  const allFiles: string[] = [];

  for (const _path of directoryContent) {
    const contentPath = join(path, _path);

    if (isDirectory(contentPath)) {
      const _dirContent = readdir(join(path, _path), recursive);

      allFiles.push(..._dirContent);
    }

    allFiles.push(contentPath);
  }

  return allFiles;
}
