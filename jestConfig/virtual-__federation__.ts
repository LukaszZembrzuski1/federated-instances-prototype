/**
 * Mock implementation of virtual:__federation__ for testing
 * This module provides mock implementations of the module federation methods
 * used by the Vite federation plugin.
 */

// Store registered remotes
const remotes = new Map<string, { url: () => Promise<string>; format: string; from: string }>();

// Store mock remote modules
const remoteModules = new Map<string, Map<string, unknown>>();

/**
 * Mock implementation of __federation_method_setRemote
 * Registers a remote module configuration
 */
export function __federation_method_setRemote(
	remoteName: string,
	config: { url: () => Promise<string>; format: string; from: string }
): void {
	remotes.set(remoteName, config);
}

/**
 * Mock implementation of __federation_method_ensure
 * Ensures a remote is loaded (mock always resolves)
 */
export function __federation_method_ensure(): Promise<unknown> {
	return Promise.resolve(undefined);
}

/**
 * Mock implementation of __federation_method_getRemote
 * Retrieves a remote module (returns a mock module if available)
 */
export function __federation_method_getRemote(
	remoteName: string,
	moduleName: string
): Promise<unknown> {
	const modules = remoteModules.get(remoteName);
	if (modules) {
		const module = modules.get(moduleName);
		if (module) {
			return Promise.resolve(module);
		}
	}
	// Return a default mock module if not found
	return Promise.resolve({ default: () => null });
}

/**
 * Mock implementation of __federation_method_unwrapDefault
 * Unwraps the default export from a module
 */
export function __federation_method_unwrapDefault<T>(module: T): T {
	if (module && typeof module === 'object' && 'default' in module) {
		return (module as { default: T }).default;
	}
	return module;
}

/**
 * Helper function to set mock remote modules for testing
 * Usage in tests:
 * ```ts
 * import { setMockRemoteModule } from '@/__mocks__/virtual-__federation__';
 * setMockRemoteModule('remote-app', './icons', { MyIcon: () => <div>Icon</div> });
 * ```
 */
export function setMockRemoteModule(remoteName: string, moduleName: string, module: unknown): void {
	if (!remoteModules.has(remoteName)) {
		remoteModules.set(remoteName, new Map());
	}
	remoteModules.get(remoteName)!.set(moduleName, module);
}

/**
 * Helper function to clear all mock remote modules
 * Useful for test cleanup
 */
export function clearMockRemoteModules(): void {
	remotes.clear();
	remoteModules.clear();
}
