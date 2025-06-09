import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), tailwindcss()],
		base: '/',
		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					manualChunks: undefined
				}
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
			},
		},
		server: {
			proxy: {
				'/api/graphql': env.GRAPHQL_ENDPOINT,
			},
		},
	};
});
