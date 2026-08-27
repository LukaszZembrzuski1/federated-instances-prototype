/** @type {import('jest').Config} */
const path = require('path');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src'],
	testMatch: ['**/__tests__/**/*.{test,spec}.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
	moduleNameMapper: {
		// Force all React and React-DOM imports to use the main project's versions
		// This prevents the "multiple React instances" error
		'^react$': '<rootDir>/node_modules/react',
		'^react-dom$': '<rootDir>/node_modules/react-dom',
		'^react/jsx-runtime$': '<rootDir>/node_modules/react/jsx-runtime',
		'^react-dom/client$': '<rootDir>/node_modules/react-dom/client',
		// Path aliases
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@test/(.*)$': '<rootDir>/src/__tests__/$1',
		// Mock virtual federation module if needed
		'^virtual:__federation__$': '<rootDir>/src/__mocks__/virtual-__federation__.ts',
		// Handle CSS and other static assets - use identity-obj-proxy for CSS modules
		'\\.module\\.(css|scss|sass)$': 'identity-obj-proxy',
		'\\.(css|less|scss|sass)$': '<rootDir>/jestConfig/cssMock.cjs',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/jestConfig/fileMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: path.resolve(__dirname, 'tsconfig.jest.json'),
				// Performance optimizations for ts-jest
				useESM: false,
			},
		],
		'^.+\\.(css|scss|sass|less)$': '<rootDir>/jestConfig/cssTransform.cjs',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/__tests__/**'],
	setupFilesAfterEnv: ['<rootDir>/jestConfig/jest.setup.ts'],
	// Ensure Jest uses the same React instance by checking root node_modules first
	moduleDirectories: ['node_modules', '<rootDir>'],
	// Transform relativity-ui to handle CSS imports, but don't transform React/React-DOM
	transformIgnorePatterns: ['node_modules/(?!(react|react-dom|relativity-ui)/)'],
	// Performance optimizations
	// Run tests in parallel (use 50% of available CPU cores, or at least 1)
	maxWorkers: '50%',
	// Speed up test file discovery
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	// Only collect coverage when explicitly requested (not in watch mode)
	collectCoverage: false,
	// Clear mocks between tests to avoid memory leaks
	clearMocks: true,
};

