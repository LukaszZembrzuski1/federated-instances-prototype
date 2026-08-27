---
name: rui-version-validation
description: "Validate the RUI version used in a project and enforce compatibility with Storybook versions available on CDN. Trigger on project setup, before component generation, on dependency changes, when reconciling AI-generated code with the actual RUI installed in the project."

allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# RUI Version Validation

---

# =========================
# METADATA
# =========================

type: governance
scope: project
version: "1.0"
status: active
last_updated: 2026-05-26

intent_tags:
  - version_check
  - dependency_validation
  - storybook_compatibility
  - rui_compatibility

# =========================
# SOURCE OF TRUTH
# =========================

source_of_truth:
  rui: relativity-ui                              # npm package — system contract
  storybook:
    base: https://cdn.r1.kcura.com/relativity-theme/relativity-ui/index.html
    # No component-specific URL — this skill is not about a single component
  package_json: ./package.json                    # project dependency truth — installed version
  cdn: https://cdn.r1.kcura.com/relativity-theme/ # Storybook version availability check
  # Note: artifact storage (e.g. Artifactory) is intentionally NOT a
  # source here. This skill reads versions from package.json — where
  # artifacts are physically hosted is a build/deploy concern, not a
  # version-detection input.

# =========================
# CONFIG
# =========================

config:
  supported_version_window: 5
  # The number of recent RUI versions Storybook CDN retains.
  # If CDN retention policy changes, update this value — do not hardcode
  # the number in validation rules below.

  package_json_path: ./package.json
  # Default location. For monorepos with multiple package.json files,
  # the calling context must specify which one applies.

# =========================
# AI USAGE CONTRACT
# =========================

ai_usage_contract:

  goal:
    - Detect the RUI version a project actually uses
    - Ensure compatibility with Storybook versions available on CDN
    - Suggest upgrade when project falls outside the supported version window
    - Prevent AI from generating code against the wrong RUI API version

  rules:
    - Always read RUI version from package.json
    - Never assume version — must be extracted from project dependencies
    - Never modify version automatically — only suggest
    - If the user declines or ignores upgrade_suggested, proceed with detected_version from package.json — advisory only, not blocking
    - If package.json cannot be read, halt and report — do not guess
    - If Storybook version does not match RUI, warn explicitly — do not silently fall back

# =========================
# PURPOSE
# =========================

purpose: A structured check that detects the RUI version installed in a project and validates it against the Storybook versions available on CDN, so AI-generated code matches the API surface the project actually ships against.

# =========================
# DETECTION
# =========================

detection:

  source: package.json
  field: dependencies["relativity-ui"]
  parser: semver

  fallbacks:
    - If file is missing or unparseable: halt with critical error
    - If field is missing: report status as "missing"
    - If value is not valid semver: halt with critical error

# =========================
# VALIDATION RULES
# =========================

validation_rules:

  - id: package_json_readable
    description: package.json must exist and be valid JSON
    severity: critical
    enforcement: blocking

  - id: rui_dependency_present
    description: relativity-ui must be defined in dependencies
    severity: critical
    enforcement: blocking

  - id: rui_version_parseable
    description: The RUI version value must be valid semver
    severity: critical
    enforcement: blocking

  - id: rui_version_within_supported_window
    description: RUI version must be within last N supported versions (see config.supported_version_window)
    condition:
      - fetch the list of available RUI versions from CDN
      - check that project_version appears within the most recent config.supported_version_window entries
    on_failure:
      severity: medium
      enforcement: suggest
      action: suggest_upgrade

  - id: storybook_version_available_on_cdn
    description: A matching Storybook version must be available on CDN
    condition:
      - resolve Storybook version from detected_version (same major.minor as RUI)
      - verify that version exists in the CDN Storybook index or version list
    on_failure:
      severity: medium
      enforcement: warn
      action: warn_and_fallback

# =========================
# DECISION LOGIC
# =========================

decision_triggers:

  valid_version:
    conditions:
      - Project uses an RUI version within the supported window
      - Matching Storybook version is on CDN
    action: proceed_without_change

  outdated_version:
    conditions:
      - Project RUI version is older than the supported window
    action: suggest_upgrade
    blocking: false

  user_declines_upgrade:
    conditions:
      - status is outdated AND the user explicitly declines, dismisses, or proceeds without upgrading
    action: proceed_with_detected_version
    blocking: false
    rationale: |
      Version-window drift is advisory. The installed package.json version remains
      the generation target. Do not re-prompt in the same session unless
      package.json or dependencies change.

  storybook_unavailable:
    conditions:
      - Matching Storybook version is not on CDN
    action: fall_back_to_oldest_available_and_warn
    rationale: |
      Silent fallback hides drift. The fallback Storybook may not match
      the project's RUI, so any API reference taken from it must be
      flagged as approximate, not authoritative.

  missing_dependency:
    conditions:
      - relativity-ui is not in package.json dependencies
    action: halt_and_report

  unreadable_package_json:
    conditions:
      - package.json does not exist OR cannot be parsed as JSON
    action: halt_and_report

# =========================
# BEHAVIOR
# =========================

behavior:

  # The skill's only external contract is the structured `output` block
  # below. How a host tool surfaces these signals (console warning,
  # lint message, inline AI commentary, CI failure) is the host's
  # responsibility, not this skill's. Behavior rules here describe what
  # the skill itself does; recommendations always travel through `output`.

  - If version is within supported range:
      - Do not modify version
      - Do not suggest upgrade
      - Emit: status=valid, recommendation=none

  - If version is outdated:
      - Do not enforce automatic bump
      - Keep backward compatibility — code generation must still target the installed version
      - Emit: status=outdated, recommendation=upgrade_suggested (non-blocking)

  - If the user ignores or declines upgrade_suggested:
      - Do not block further work — validation cannot change package.json
      - Continue targeting detected_version (installed), not the latest CDN version
      - Emit: recommendation=none, status=outdated (unchanged), and add one warning that upgrade was suggested but not applied
      - Do not repeat the upgrade prompt in the same session unless package.json or dependencies change

  - If Storybook version unavailable on CDN:
      - Fall back to the oldest available version on CDN as approximate reference
      - Emit: storybook_match=fallback with an explicit warning
      - Flag any AI-generated code based on this fallback as needing human review

  - If package.json is unreadable or RUI is missing:
      - Halt all version-dependent skills
      - Emit: status=missing or status=unreadable, recommendation=fix_required (blocking)
      - Do not proceed with component generation

# =========================
# OUTPUT
# =========================

output:

  format:
    detected_version:
      type: "semver_string | null"
      example: "4.7.2"

    latest_supported_range:
      type: "semver_range"
      example: ">=4.3.0 <=4.7.2"

    status:
      type: enum
      values: [valid, outdated, missing, unreadable]

    storybook_match:
      type: enum
      values: [exact, fallback, none]

    recommendation:
      type: enum
      values: [none, upgrade_suggested, fix_required]

    warnings:
      type: array_of_strings
      example: ["Storybook 4.1.0 not on CDN, falling back to 4.3.0 — API reference is approximate"]

# =========================
# RELATED
# =========================

related:

  related_skills:
    - All component skills depend on this skill running first in a project context
    - Without a valid detected_version, component skills cannot reliably target the right API

---

## After editing this skill

```bash
node relativity-design-system-skills/scripts/generate-all-plugins.mjs
```

Commit updated files under `skills/` and the regenerated `cursor-plugin/` and `claude-code-plugin/` trees.
