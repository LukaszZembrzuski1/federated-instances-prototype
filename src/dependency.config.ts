export type DependencyConfig = {
	key: string;
	remoteUrl: string;
	appName: string;
	remoteName: string;
	module: string;
	type: 'module' | 'react';
	isProgressiveRolloutEnabled?: boolean;
	serviceName?: string;
	resourcePath?: string;
};

const dependencies: DependencyConfig[] = [
	{
		key: 'icons',
		remoteUrl: 'assets/remoteEntry.js',
		appName: 'relativity-icons',
		remoteName: 'remote-app',
		module: './icons',
		type: 'module',
		isProgressiveRolloutEnabled: true,
		serviceName: 'relativity-icons',
		resourcePath: 'assets',
	},
	{
		key: 'applet3',
		remoteUrl: 'assets/remoteEntry.js',
		appName: 'mfe-applet-template',
		remoteName: 'remote-app',
		module: './applet3',
		type: 'react',
		isProgressiveRolloutEnabled: true,
		serviceName: 'mfe-applet-template',
		resourcePath: 'assets',
	},
];

export { dependencies };
