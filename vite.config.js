/** @format */

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import';
import checker from 'vite-plugin-checker';
import timeReporter from 'vite-plugin-time-reporter';
import pkg from './package.json' assert { type: 'json' };
import https from 'https';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		base: '/html_editor/',
		define: {
			__APP_VERSION__: JSON.stringify(pkg.version),
		},
		server: {
			port: parseInt(process.env.VITE_APP_PORT || '') || 8001,
			https: true,
			open: true,
			proxy: {
				'/proxy-api': {
					target: process.env.VITE_APP_APIBASE,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/proxy-api/, ''),
					agent: new https.Agent(),
				},
			},
		},
		resolve: {
			alias: [
				{
					find: /\@\//,
					replacement: path.join(__dirname, './src/'),
				},
			],
		},
		plugins: [
			basicSsl(),
			timeReporter(),
			dynamicImport(),
			react(),
			ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
			checker({
				typescript: true,
			}),
		],
	});
};
