# CLAUDE.md

## Auth playground

Prototype workspace for User Authentication design work, built on the Relativity **mfe-applet-template** with **relativity-ui** components. Current project: **Federated Instances** (PRD in `docs/PRD-federated-instances.md`).

## Conventions

- Use **relativity-ui** components (`import { ... } from 'relativity-ui'`) — not raw PrimeReact and not plain HTML controls where an RUI component exists.
- Follow the Relativity UI component skills in `.claude/skills/` when building or modifying UI.
- Any new or modified UI must satisfy the accessibility skill at `.claude/skills/accessibility/SKILL.md` before the change is considered complete.
- Theme comes from the CDN import in `src/index.css`; do not hand-roll colors where a token/theme value exists.
- Dev server: `npm run dev` (Vite, port 4001). Tests: `npx jest`. Typecheck: `npx tsc -b`.
- Registry: packages resolve from Relativity Artifactory (`.npmrc`); if installs return 401, refresh the JFrog token.
