import { Button, Dialog } from 'relativity-ui';

import { type Destination, effectiveName } from '@/App/FederatedInstances/data';

interface Props {
	destination: Destination | null;
	onHide: () => void;
	onConfirm: (destination: Destination) => void;
}

/**
 * Leave-instance semantics per PRD R2: honest copy, no implication that data,
 * permissions, or security travel; SSO-continuation wording only for declared
 * topology (R2.2), plain navigation in a new tab (R1.3/R2.3).
 */
export function LeaveInstanceDialog({ destination, onHide, onConfirm }: Props) {
	if (!destination) return null;

	const ssoDeclared = destination.authRelationship === 'serverTrustsSourceAsOidcProvider';
	const name = effectiveName(destination);

	return (
		<Dialog
			header='Switch instance'
			visible
			width='small'
			onHide={onHide}
			footer={
				<>
					<Button label='Cancel' severity='secondary' onClick={onHide} />
					<Button label={`Go to ${name}`} onClick={() => onConfirm(destination)} autoFocus />
				</>
			}
		>
			<div style={{ paddingBottom: 'var(--size-s)' }}>
				<p style={{ marginTop: 0 }}>
					<strong>{name}</strong> opens in a new tab. Your session on United States Central stays
					active in this one.
				</p>
				<p style={{ marginBottom: 0 }}>
					{ssoDeclared
						? 'Your organization’s single sign-on may sign you in automatically. '
						: 'You may need to sign in again. '}
					Each instance keeps its own cases, permissions, and data.
				</p>
			</div>
		</Dialog>
	);
}
