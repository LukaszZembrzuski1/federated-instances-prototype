---
name: help-topic-redirector-links
description: "Use when adding or reviewing links from the product UI to documentation, help.relativity.com, or other sites. Trigger on: Learn more, help links, error message doc links, settings links, redirector, topic.html, In-Product Help Links, or avoiding hardcoded documentation URLs. Not for drafting error message wording (use ui-errors-and-notifications) or general voice (use relativity-ui-writing-style)."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Help Topic Redirector links

Canonical rules for **maintainable** in-product links to documentation and other Relativity-owned destinations.

## Primary references

- [Help Topic "Redirector" Links](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14746065/Help+Topic+%22Redirector%22+Links)
- [User interface messages guidance](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745747/User+interface+messages+guidance) (linking sections)
- [User interface writing guides and standards](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14745755/User+interface+writing+guides+and+standards)
- [UI elements](https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14746085/UI+elements) (linking from controls)

## Source metadata (Confluence)

```yaml
primary_source:
  type: confluence-page
  title: Help Topic "Redirector" Links
  url: https://relativity-oda.atlassian.net/wiki/spaces/DOCTM/pages/14746065/Help+Topic+%22Redirector%22+Links
```

## Core rule

**Never hard-code long final documentation URLs** (or raw external targets) in product UI code or configuration when the intent is “link to help/docs.”

**Always** use the **Help Topic “Redirector”** mechanism so the UI holds a **short, stable URL** of the form:

`https://help.relativity.com/topic.html?t=ZZZZZ`

(Use the exact `t=` value from the redirector system / spreadsheet; it is **case-sensitive**.)

### Why

- The short URL can be **repointed centrally** when documentation moves; product source does not need a code change for every doc URL update.
- One redirector ID can be reused anywhere; teams update the **“Redirects to topic”** mapping instead of searching the codebase for brittle full URLs.

## Conceptual process (for authors and agents)

1. Identify the documentation page or external site you need to link to.
2. In the **Help Topic Redirector** process (shared **In-Product Help Links** spreadsheet — see the Confluence page above), **create or locate** an entry that maps a short ID to that target.
3. Copy the generated **short redirector URL** exactly.
4. Wire buttons, text links, help icons, and error “Learn more” links to that **short URL**, not the long destination URL.

After spreadsheet updates, propagation is typically on the order of **~10–25 minutes** (per internal process documentation).

## Usage rules

- Redirector URLs can target **non–help.relativity.com** properties when appropriate; still prefer this mechanism for Relativity-owned destinations that may move.
- **Do not** expose redirect mechanics to users; the link should behave like a normal hyperlink (same tab vs new tab follows existing product UX patterns).
- If no redirector exists yet: note that a new entry must be created via the documented process and coordinate with **documentation@relativity.com** or the assigned technical writer as needed.

## Related skills

- **ui-errors-and-notifications** — when the link sits inside an error or notification; still use redirector URLs per this skill.
- **relativity-ui-writing-style** — labels, link text, and Style Guide alignment.
- Component skills where links often appear: **link**, **validation-message**, **message**, **toast**, **confirm-dialog**, **form-field**.
