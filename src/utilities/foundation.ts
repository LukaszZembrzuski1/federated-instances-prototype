import { Foundation, createFoundation } from 'relativity-foundation-react';

import { name as pkgName, version as pkgVersion } from '../../package.json';

/**
 * Update the foundation configuration with your own values
 */
export async function initializeFoundationPromise(): Promise<Foundation | undefined> {
	try {
		return await createFoundation({
			name: pkgName,
			version: pkgVersion,
			// teamId: TEAM_ID,
			// flags: {
			// 	envKey: {
			// 		development: ENV_KEY.DEVELOPMENT,
			// 		governmentproduction: ENV_KEY.GOVERNMENT_PRODUCTION,
			// 		governmentregression: ENV_KEY.GOVERNMENT_REGRESSION,
			// 		production: ENV_KEY.PRODUCTION,
			// 		regression: ENV_KEY.REGRESSION
			// 	}
			// },
			logs: {
				applicationName: pkgName,
			},
			telemetry: true,
		});
	} catch (e) {
		console.error(e);
	}
}
