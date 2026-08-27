import { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Logs via console rather than relativity-foundation's useStructuredLog:
// foundation init is fire-and-forget in this prototype (it has no PageBase to
// talk to on static hosts), and useStructuredLog throws until init completes.
const ErrorBoundaryWrapper = ({
	componentName,
	children,
}: {
	componentName: string;
	children: ReactNode;
}) => {
	const handleError = (error: unknown, errorInfo: ErrorInfo) => {
		console.error(`Error thrown by ${componentName}`, error, errorInfo.componentStack);
	};

	return (
		<ErrorBoundary
			fallback={
				<div style={{ padding: 16 }}>
					Something went wrong rendering {componentName}. Reload the page to try again.
				</div>
			}
			onError={handleError}
		>
			{children}
		</ErrorBoundary>
	);
};

export default ErrorBoundaryWrapper;
