// Suppress jsdom CSS parsing errors
const originalError = console.error;
console.error = (...args: unknown[]) => {
	const first = args[0];

	// Handle Error objects
	if (first instanceof Error && first.message.includes('Could not parse CSS stylesheet')) {
		return;
	}

	// Handle string messages
	if (typeof first === 'string' && first.includes('Could not parse CSS stylesheet')) {
		return;
	}

	// Fallback: inspect all args
	if (
		args.some(
			(arg: unknown) =>
				typeof arg === 'object' &&
				arg !== null &&
				'message' in arg &&
				typeof arg.message === 'string' &&
				arg.message.includes('Could not parse CSS stylesheet')
		)
	) {
		return;
	}
	originalError.call(console, ...args);
};
