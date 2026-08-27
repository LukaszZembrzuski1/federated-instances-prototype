/**
 * Centralized Authentication user management (multi-tenant).
 *
 * Model per the UX review with Luke Miller (2026-08-21):
 * - A person either already has a centralized (Okta) account or not; the
 *   current UI hides this, which is the root confusion.
 * - Providers act as per-tenant access policies. Assigning an EXISTING central
 *   user grants access immediately (no invitation, straight to Enrolled).
 *   A NEW person gets a real invitation and sits in Pending until they set up
 *   their account.
 */
export type UserType = 'Internal' | 'External';
export type AssignmentStatus = 'Pending' | 'Enrolled';

export interface AuthUser {
	id: number;
	artifactId: number;
	fullName: string;
	email: string;
	userType: UserType;
	/** Already has a centralized (Okta) account, from any tenant. */
	hasCentralAccount: boolean;
	/** Provider name -> assignment status in THIS tenant. */
	assignments: Record<string, AssignmentStatus>;
}

export const PROVIDERS = [
	'Default Password Provider',
	'MFA Email',
	'MFA Authenticator App',
	'SSO Okta SAML'
];

export const AUTH_SECTION_TABS = [
	'Authentication Provider',
	'Authentication Provider (legacy)',
	'Centralized Authentication',
	'OAuth2 Client',
	'Federated Instance'
];

export const INITIAL_USERS: AuthUser[] = [
	{ id: 1, artifactId: 1022850, fullName: 'Alimeti, Chandra Kaushik', email: 'chandra.alimeti@relativity.com', userType: 'Internal', hasCentralAccount: true, assignments: { 'Default Password Provider': 'Enrolled' } },
	{ id: 2, artifactId: 1023297, fullName: 'A, User', email: 'user_a@example.com', userType: 'Internal', hasCentralAccount: false, assignments: {} },
	{ id: 3, artifactId: 1103194, fullName: 'Admin, Test ARM', email: 'test@google.com', userType: 'Internal', hasCentralAccount: true, assignments: { 'MFA Email': 'Enrolled' } },
	{ id: 4, artifactId: 1025011, fullName: 'Aero CI/CD, RelativityIdentityRAP 1', email: 'RelativityIdentityRAP_1_svc@test.com', userType: 'Internal', hasCentralAccount: true, assignments: { 'Default Password Provider': 'Enrolled', 'SSO Okta SAML': 'Enrolled' } },
	{ id: 5, artifactId: 2021929, fullName: 'ap, ap', email: 'ap@gmail.com', userType: 'Internal', hasCentralAccount: false, assignments: {} },
	{ id: 6, artifactId: 2020993, fullName: 'AppMfa, Classic', email: 'classic.appmfa@relativity-userauth.testinator.email', userType: 'External', hasCentralAccount: true, assignments: {} },
	{ id: 7, artifactId: 1023930, fullName: 'asd, asd', email: 'asd@gmail.com', userType: 'External', hasCentralAccount: false, assignments: {} },
	{ id: 8, artifactId: 2018904, fullName: 'Auth0, Only MFA', email: 'onlymfa@relativity-userauth.testinator.email', userType: 'External', hasCentralAccount: true, assignments: { 'MFA Email': 'Pending' } },
	{ id: 9, artifactId: 2018902, fullName: 'Auth0, OnlyEmail', email: 'onlyemail@relativity-userauth.testinator.email', userType: 'External', hasCentralAccount: false, assignments: {} },
	{ id: 10, artifactId: 2018900, fullName: 'Auth0, Standard', email: 'standard@relativity-userauth.testinator.email', userType: 'External', hasCentralAccount: false, assignments: {} },
	{ id: 11, artifactId: 2019011, fullName: 'Builder, Ben', email: 'ben.builder@relativity.one', userType: 'Internal', hasCentralAccount: true, assignments: { 'Default Password Provider': 'Enrolled', 'MFA Authenticator App': 'Enrolled' } },
	{ id: 12, artifactId: 2019340, fullName: 'Chen, Olivia', email: 'olivia.chen@relativity.com', userType: 'Internal', hasCentralAccount: false, assignments: { 'Default Password Provider': 'Pending' } }
];
