import { FunctionComponent, createElement, useEffect, useState } from 'react';
import {
	__federation_method_ensure as ensure,
	__federation_method_getRemote as getRemote,
	__federation_method_setRemote as setRemote,
	__federation_method_unwrapDefault as unwrapModule,
} from 'virtual:__federation__';

import { initializeFoundationPromise } from './utilities/foundation';

const RELATIVITY_ICONS_MODULE = {
	name: 'remote-app',
	/* URL kept as a fallback in case the module is not found */
	remoteEntry: 'https://cdn.r1.kcura.com/relativity-icons/assets/remoteEntry.js',
	path: './icons',
};

type RelativityIconProps = {
	name: string;
	[key: string]: unknown;
};

// Cache the icons promise at module level so it's only fetched once
let iconsPromise: Promise<unknown> | null = null;

async function getIcons() {
	// If we already have a promise, return it (even if it's still pending)
	if (iconsPromise) {
		return iconsPromise;
	}

	// Create and cache the promise
	iconsPromise = (async () => {
		const relativityIconRemoteModuleUrl =
			(await initializeFoundationPromise().then((foundation) =>
				foundation?.urlBuilder?.resolveApplicationEntryPointURL(
					'relativity-icons/deploymentManifest.json',
					'relativity-icons/assets',
					'relativity-icons'
				)
			)) || RELATIVITY_ICONS_MODULE.remoteEntry;

		setRemote('remote-app', {
			url: () => Promise.resolve(relativityIconRemoteModuleUrl),
			format: 'esm',
			from: 'vite',
		});

		await ensure(RELATIVITY_ICONS_MODULE.name);
		const remoteModule = getRemote(RELATIVITY_ICONS_MODULE.name, RELATIVITY_ICONS_MODULE.path);
		const component = unwrapModule(remoteModule);
		return component;
	})();

	return iconsPromise;
}

const RelativityIcons = ({ name, ...attr }: RelativityIconProps) => {
	const [icons, setIcons] = useState<Record<string, unknown>>();

	useEffect(() => {
		getIcons().then((icons) => setIcons(icons as Record<string, unknown>));
	}, []);

	if (!icons) return <div>Loading icons...</div>;

	const IconComponent = icons[name] as FunctionComponent;
	return IconComponent ? createElement(IconComponent, { ...attr }) : null;
};

export default RelativityIcons;
