import type { CSSProperties, ReactNode } from 'react';

import relativityLogo from '@/assets/relativity-logo.png';

// Workspace shell chrome is Figma-first (no shipped RUI component); the dark
// rail colors below match production Aero chrome, not the semantic token set.
const RAIL_BG = '#151820';
const RAIL_TEXT = '#aeb6c4';

const NAV_ITEMS = [
	{ icon: 'relativity-icons-sidebar-sidebar-workspaces', label: 'Workspaces' },
	{ icon: 'relativity-icons-sidebar-sidebar-access', label: 'Access' },
	{ icon: 'relativity-icons-sidebar-sidebar-configure', label: 'Configure', active: true },
	{ icon: 'relativity-icons-sidebar-sidebar-infrastructure', label: 'Infrastruct...' },
	{ icon: 'relativity-icons-sidebar-sidebar-monitor', label: 'Monitor' },
	{ icon: 'relativity-icons-sidebar-sidebar-data-transfer', label: 'Data Transfer' }
];

function RIcon({ name, style }: { name: string; style?: CSSProperties }) {
	return <span className={name} aria-hidden='true' style={{ fontFamily: 'relativity-icons', ...style }} />;
}

interface Props {
	/** Breadcrumb trail, first-to-last; last item is the current page. */
	breadcrumb: string[];
	instanceName: string;
	accountSlot: ReactNode;
	children: ReactNode;
}

export function AeroShell({ breadcrumb, instanceName, accountSlot, children }: Props) {
	return (
		<div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--color-background-primary)' }}>
			<a
				href='#main-content'
				style={{
					position: 'absolute',
					left: -9999,
					top: 0,
					background: 'var(--color-background-secondary)',
					padding: 'var(--size-s)',
					zIndex: 2000
				}}
				onFocus={(e) => (e.currentTarget.style.left = '0')}
				onBlur={(e) => (e.currentTarget.style.left = '-9999px')}
			>
				Skip to main content
			</a>

			{/* Left rail */}
			<nav
				aria-label='Primary'
				style={{ width: 48, background: RAIL_BG, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
			>
				<div
					style={{
						width: 48,
						height: 48,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexShrink: 0
					}}
				>
					<img src={relativityLogo} alt='' width={48} height={48} style={{ display: 'block' }} />
					<span className='sr-only'>Relativity</span>
				</div>

				<ul style={{ flex: 1, margin: 0, padding: 'var(--size-m) 0 0', listStyle: 'none', width: '100%' }}>
					{NAV_ITEMS.map((item) => (
						<li key={item.label}>
<a
								href='#'
								aria-current={item.active ? 'page' : undefined}
								aria-label={item.label}
								title={item.label}
								onClick={(e) => e.preventDefault()}
								style={{
									width: '100%',
									height: 48,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textDecoration: 'none'
								}}
							>
								<RIcon name={item.icon} style={{ color: item.active ? 'var(--color-white)' : RAIL_TEXT, fontSize: 20 }} />
							</a>
						</li>
					))}
				</ul>

				<div style={{ paddingBottom: 'var(--size-l)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--size-xl)' }}>
					<button
						type='button'
						aria-label='Collapse sidebar'
						style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--size-xs)' }}
					>
						<RIcon name='relativity-icons-arrows-collapse-sidebar' style={{ color: RAIL_TEXT, fontSize: 18 }} />
					</button>
					<button type='button' aria-label='More navigation options' style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--size-xs)' }}>
						<RIcon name='relativity-icons-navigation-menu' style={{ color: RAIL_TEXT, fontSize: 18 }} />
					</button>
				</div>
			</nav>

			{/* Main area */}
			<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
				<header
					style={{
						height: 48,
						background: 'var(--color-background-secondary)',
						borderBottom: '1px solid var(--color-border-secondary)',
						display: 'flex',
						alignItems: 'center',
						padding: '0 var(--size-l)',
						gap: 'var(--size-m)',
						flexShrink: 0
					}}
				>
					<span className='rui-body-bold' style={{ color: 'var(--color-text-primary)', fontSize: 15, whiteSpace: 'nowrap' }}>
						{instanceName}
					</span>

					<nav aria-label='Breadcrumb' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
						<ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-s)', margin: 0, padding: 0, listStyle: 'none' }}>
							{breadcrumb.map((part, i) => {
								const last = i === breadcrumb.length - 1;
								return (
									<li key={part} style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-s)' }}>
										{i > 0 && (
											<RIcon name='relativity-icons-arrows-breadcrumbs-arrow' style={{ color: 'var(--color-gray-40)', fontSize: 11 }} />
										)}
										{last ? (
											<span aria-current='page' style={{ color: 'var(--color-text-primary)' }}>
												{part}
											</span>
										) : (
											<a href='#' onClick={(e) => e.preventDefault()} style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>
												{part}
											</a>
										)}
									</li>
								);
							})}
							<li>
								<button
									type='button'
									aria-label='Add to favorites'
									style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--size-xxs)' }}
								>
									<RIcon name='relativity-icons-favorite' style={{ color: 'var(--color-gray-40)', fontSize: 15 }} />
								</button>
							</li>
						</ol>
					</nav>

					<div role='search' style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-m)' }}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								border: '1px solid var(--color-border-secondary)',
								borderRadius: 'var(--border-radius)',
								padding: 'var(--size-xs) var(--size-m)',
								gap: 'var(--size-s)',
								width: 280,
								background: 'var(--color-background-secondary)'
							}}
						>
							<RIcon name='relativity-icons-search-search' style={{ color: 'var(--color-gray-40)', fontSize: 14 }} />
							<input
								type='search'
								aria-label='Search'
								placeholder='Search...'
								style={{ border: 'none', background: 'transparent', outline: 'none', font: 'inherit', width: '100%', color: 'var(--color-text-primary)' }}
							/>
							<span className='rui-caption' style={{ color: 'var(--color-gray-30)', whiteSpace: 'nowrap' }}>
								CTRL + /
							</span>
						</div>
						<button type='button' aria-label='Favorites' style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--size-xxs)' }}>
							<RIcon name='relativity-icons-favorite' style={{ color: 'var(--color-gray-50)', fontSize: 18 }} />
						</button>
						{accountSlot}
					</div>
				</header>

				<main id='main-content' style={{ flex: 1, overflow: 'auto' }}>
					{children}
				</main>
			</div>
		</div>
	);
}
