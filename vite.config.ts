import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

import { createRelativityProxy, devAuthPlugin } from './vite-plugins/devAuthPlugin';
import { hashRemoteEntry } from './vite-plugins/hash-remote-entry';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
	base: '/',
	plugins: [
		...(command === 'serve' ? [devAuthPlugin(mode)] : []),
		react(),
		federation({
			name: 'remote-app',
			filename: 'remoteEntry.js',
			exposes: {
				'./app': './src/App/App.tsx',
			},
			remotes: {
				remoteName: '',
			},
			shared: {
				'react': { version: '^19.1.0' },
				'react-dom': { version: '^19.1.0' },
			},
		}),
		hashRemoteEntry(),
	],
	server: {
		port: 4077,
		strictPort: true,
		origin: 'http://localhost:4077',
		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:4002',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': 'GET',
		},
		cors: true,
		...(command === 'serve' ? { proxy: createRelativityProxy(mode) } : {}),
	},
	preview: {
		port: 4077,
	},
	build: {
		target: 'esnext',
		modulePreload: false,
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: [
				{
					esModule: true,
					exports: 'named',
					format: 'esm',
				},
			],
		},
		outDir: 'dist',
	},
	resolve: {
		dedupe: ['react', 'react-dom'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
}));
