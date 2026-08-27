import { Plugin } from 'vite';
import { createHash } from 'node:crypto';

/**
 * Custom Vite plugin to hash remoteEntry.js and fix dynamic path detection
 * 
 * @returns Vite plugin configuration
 */
export function hashRemoteEntry(): Plugin {
  return {
    name: 'hash-remote-entry',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const remoteEntryKey = Object.keys(bundle).find(key => 
        key.endsWith('remoteEntry.js') || key === 'remoteEntry.js'
      );

      if (!remoteEntryKey) {
        return;
      }

      const remoteEntry = bundle[remoteEntryKey];
      if (remoteEntry.type !== 'asset' && remoteEntry.type !== 'chunk') {
        return;
      }

      const code = remoteEntry.type === 'chunk' ? remoteEntry.code : remoteEntry.source.toString();

      const hash = createHash('sha256').update(code).digest('hex').substring(0, 8);
      
      const newFileName = `assets/remoteEntry-${hash}.js`;

      const fixedCode = code.replace(
        /(\w+)\.substring\(0,\s*\1\.lastIndexOf\(["']remoteEntry\.js["']\)\)/g,
        'new URL(\'.\', $1).href'
      );

      if (remoteEntry.type === 'chunk') {
        bundle[newFileName] = {
          ...remoteEntry,
          fileName: newFileName,
          code: fixedCode
        };
      } else {
        bundle[newFileName] = {
          ...remoteEntry,
          fileName: newFileName,
          source: fixedCode
        };
      }

      delete bundle[remoteEntryKey];
    }
  };
}

