import { describe, expect, it } from '@jest/globals';

import { INITIAL_DESTINATIONS, resolveForUser } from '@/App/FederatedInstances/data';

describe('resolveForUser', () => {
	it('returns merged IdP and manual rows when assignment-backed listing is on', () => {
		const rows = resolveForUser(INITIAL_DESTINATIONS, { assignmentBackedListing: true, previewSecurity: false });
		expect(rows.some((r) => r.origin === 'idp')).toBe(true);
		expect(rows.some((r) => r.origin === 'manual')).toBe(true);
	});

	it('never returns hidden rows', () => {
		const rows = resolveForUser(INITIAL_DESTINATIONS, { assignmentBackedListing: true, previewSecurity: false });
		expect(rows.every((r) => !r.hidden)).toBe(true);
	});

	it('returns manual rows only under preview security (R1.6)', () => {
		const rows = resolveForUser(INITIAL_DESTINATIONS, { assignmentBackedListing: true, previewSecurity: true });
		expect(rows.length).toBeGreaterThan(0);
		expect(rows.every((r) => r.origin === 'manual')).toBe(true);
	});

	it('returns manual rows only when assignment-backed listing is off', () => {
		const rows = resolveForUser(INITIAL_DESTINATIONS, { assignmentBackedListing: false, previewSecurity: false });
		expect(rows.every((r) => r.origin === 'manual')).toBe(true);
	});
});
