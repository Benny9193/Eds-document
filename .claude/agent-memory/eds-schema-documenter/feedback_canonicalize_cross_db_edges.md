---
name: Canonicalize cross-DB edges before counting
description: The 198-edge headline for Catalogs->EDS deflates to 65 once target_object strings are cleaned of alias/join noise. Always offer both numbers when reporting edge counts, or pick canonical depending on the question.
type: feedback
---

**Rule:** When counting cross-database reference "edges", be explicit about which dedup key you are using. The text-grep regex captures alias and JOIN noise (e.g., `Catalog Catalog1 on Catalog1`) into the `target_object` capture group. The default scanner in `src/document-dependencies.js` dedups on the *raw* substring, which counts every aliased instance separately. For analytical work, normalize to canonical `schema.name` and resolve against the target DB's `sys.objects`.

**Why:** On 2026-05-04 the `Catalogs` -> `EDS` coupling was reported as 198 edges by `npm run deps` and 65 canonical edges by the focused drill-down. Both are correct; they answer different questions. 198 = "distinct (source, raw-reference-text) pairs" = good for grep-ability of the raw definitions. 65 = "distinct (source, physical EDS object)" = good for impact analysis. Reporting only one in isolation is misleading.

**How to apply:**
- For impact analysis, write-set / read-set questions, or "what would breaking X do?" — use the canonical count.
- For "how rich is the regex match?" or "how many places in the code mention this?" — use the raw scanner count.
- Cleaning recipe: `cleaned = raw.match(/^([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)?)/)?.[1]` then resolve against `[<targetDb>].sys.objects` with a fallback to bare-name lookup for empty-schema four-part forms.
- Note: the existing scanner's broader-dedup count is still useful as the headline because it surfaces the alias/join volume — a small canonical edge set with a large raw-edge multiplier (e.g., 65 -> 198) signals heavy JOIN-style usage of the target tables, which is itself an architectural signal.
