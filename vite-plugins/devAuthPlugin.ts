import type { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { Plugin, loadEnv } from 'vite';

function isValidHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

function resolveBase(rawBase: string | undefined): string | undefined {
	const trimmed = rawBase?.trim();
	if (!trimmed) return undefined;
	if (!isValidHttpUrl(trimmed)) {
		console.warn(
			`[dev-auth] DEV_API_BASE "${trimmed}" is not a valid http(s):// URL — plugin disabled.`
		);
		return undefined;
	}
	const withoutTrailingSlashes = trimmed.replace(/\/+$/, '');
	return `${withoutTrailingSlashes}/`;
}

// Dev only: token for /relativity.rest proxy. Not used in production build.
// Security: CLIENT_ID/CLIENT_SECRET and devAccessToken stay in Node (never in client bundle).
export let devAccessToken: string | null = null;

async function fetchToken(tokenUrl: string, clientId: string, clientSecret: string): Promise<void> {
	const body = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		scope: 'SystemUserInfo',
		grant_type: 'client_credentials',
	});
	try {
		const r = await fetch(tokenUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: body.toString(),
		});
		if (!r.ok) {
			console.error(`[dev-auth] Failed to fetch token: ${r.status} ${r.statusText}`);
			return;
		}
		const data = (await r.json()) as { access_token?: string; expires_in?: number };
		if (data.access_token) {
			devAccessToken = data.access_token;
			if (data.expires_in && data.expires_in > 0 && data.expires_in < 86_400) {
				// Only schedule refresh for short-lived tokens (< 1 day); long-lived tokens outlast any dev session
				setTimeout(
					() => fetchToken(tokenUrl, clientId, clientSecret),
					data.expires_in * 0.9 * 1000
				);
			}
		}
	} catch (error) {
		console.error(`[dev-auth] Failed to fetch token: ${error}`);
	}
}

// Dev server only: fetches OAuth token at startup; proxy adds Bearer to outgoing /relativity.rest requests
export function devAuthPlugin(mode: string): Plugin {
	const env = loadEnv(mode, process.cwd(), '');
	const normalizedBase = resolveBase(env.DEV_API_BASE);
	const tokenUrl = normalizedBase ? `${normalizedBase}Relativity/Identity/connect/token` : '';

	return {
		name: 'dev-auth',
		async configureServer() {
			const clientId = env.CLIENT_ID;
			const clientSecret = env.CLIENT_SECRET;

			if (!clientId || !clientSecret || !normalizedBase) return;
			await fetchToken(tokenUrl, clientId, clientSecret);
		},
	};
}

type ProxyLike = {
	on(
		event: 'proxyRes',
		listener: (proxyRes: IncomingMessage, req: IncomingMessage) => void
	): void;
	on(
		event: 'proxyReq',
		listener: (proxyReq: ClientRequest, req: IncomingMessage, res: ServerResponse) => void
	): void;
};

// Proxy path prefixes (deduplicated; first segment varies by endpoint). All use same target and auth.
const PROXY_PATHS = [
	'/relativity.rest',
	'/Relativity.Rest',
	'/Relativity.REST',
	'/Relativity',
	'/releye',
];

function proxyConfig(target: string) {
	return {
		target,
		changeOrigin: true,
		cookieDomainRewrite: 'localhost',
		configure: (proxy: ProxyLike) => {
			proxy.on('proxyReq', (proxyReq) => {
				if (devAccessToken) {
					proxyReq.setHeader('Authorization', `Bearer ${devAccessToken}`);
				}
			});
		},
	};
}

export function createRelativityProxy(mode: string) {
	const env = loadEnv(mode, process.cwd(), '');
	const normalizedBase = resolveBase(env.DEV_API_BASE);
	if (!normalizedBase) return {};
	return Object.fromEntries(PROXY_PATHS.map((path) => [path, proxyConfig(normalizedBase)]));
}

