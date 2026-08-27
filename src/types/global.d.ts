import { ComponentType, LazyExoticComponent } from 'react';

declare type DependencyConfig = {
	key: string;
	remoteUrl: string;
	remoteName: string;
	module: string;
	type: 'module' | 'react';
};
declare global {
	interface Window {
		relativity?: {
			_getCdnUrl?: () => string | Promise<string>;
		};
		nf?: {
			loadDependency?: (
				config: DependencyConfig
			) => Promise<LazyExoticComponent<ComponentType<object>> | undefined>;
		};
	}
}
