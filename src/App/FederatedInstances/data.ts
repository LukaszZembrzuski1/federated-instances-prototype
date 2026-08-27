export type Origin = 'idp' | 'manual';
export type Topology = 'R1' | 'SERVER';
export type AuthRelationship = 'unknown' | 'serverTrustsSourceAsOidcProvider';

export interface Destination {
	id: number;
	/** Friendly label shown in flyout and list (PRD: Display name). */
	displayName: string;
	/** Admin rename overlay; when set, wins over displayName without changing source truth (R3.3/R3.6). */
	renamedTo?: string;
	entryUrl: string;
	origin: Origin;
	topology: Topology;
	authRelationship?: AuthRelationship;
	/** Instance policy: hidden rows resolve for admins but are not advertised (R3.3). */
	hidden: boolean;
	/** Instance policy ordering (R3.3). */
	order: number;
}

export const CURRENT_INSTANCE = 'United States Central';
export const CURRENT_USER_EMAIL = 'philip.mak@relativity.com';

export const INITIAL_DESTINATIONS: Destination[] = [
	{ id: 1, displayName: 'Australia', entryUrl: 'https://au.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 1 },
	{ id: 2, displayName: 'Canada', entryUrl: 'https://ca.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 2 },
	{ id: 3, displayName: 'Germany', entryUrl: 'https://de.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 3 },
	{ id: 4, displayName: 'United Kingdom', entryUrl: 'https://uk.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 4 },
	{ id: 5, displayName: 'Hong Kong', entryUrl: 'https://hk.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 5 },
	{ id: 6, displayName: 'South Africa', entryUrl: 'https://za.relativity.one/Relativity', origin: 'idp', topology: 'R1', hidden: false, order: 6 },
	{
		id: 7,
		displayName: 'Litigation Server (on-prem)',
		entryUrl: 'https://server.contoso.com/Relativity',
		origin: 'manual',
		topology: 'SERVER',
		authRelationship: 'serverTrustsSourceAsOidcProvider',
		hidden: false,
		order: 7
	},
	{ id: 8, displayName: 'Development Sandbox', entryUrl: 'https://dev-sbx.relativity.one/Relativity', origin: 'manual', topology: 'R1', hidden: false, order: 8 },
	{ id: 9, displayName: 'EA Sandbox', entryUrl: 'https://ea-sbx.relativity.one/Relativity', origin: 'manual', topology: 'R1', hidden: true, order: 9 },
	{ id: 10, displayName: 'Old QA Environment', entryUrl: 'https://qa-old.relativity.one/Relativity', origin: 'manual', topology: 'R1', hidden: true, order: 10 }
];

export function effectiveName(d: Destination): string {
	return d.renamedTo?.trim() ? d.renamedTo : d.displayName;
}

/**
 * Destination-list resolution per PRD (R1.6, R3.1): policy-filtered, ordered;
 * preview security drops all IdP-backed rows.
 */
export function resolveForUser(
	destinations: Destination[],
	opts: { assignmentBackedListing: boolean; previewSecurity: boolean }
): Destination[] {
	const idpAllowed = opts.assignmentBackedListing && !opts.previewSecurity;
	return destinations
		.filter((d) => !d.hidden)
		.filter((d) => d.origin === 'manual' || idpAllowed)
		.sort((a, b) => a.order - b.order);
}
