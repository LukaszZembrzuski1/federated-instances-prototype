declare module 'virtual:__federation__' {
	export function __federation_method_getRemote(
		remoteName: string,
		moduleName: string
	): Promise<unknown>;
	export function __federation_method_setRemote(
		remoteName: string,
		config: { url: () => Promise<string>; format: string; from: string }
	): void;
	export function __federation_method_ensure(remoteName: string): Promise<unknown>;
	export function __federation_method_unwrapDefault<T>(module: T): T;
}
