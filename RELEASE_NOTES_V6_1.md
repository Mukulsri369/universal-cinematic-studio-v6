# v6.1 — Full static combination QA patch

* Fixed four `composition-recipes.json` entries containing duplicate modules: `creator-commerce`, `wellness-organic`, `outdoor-expedition`, `learning-lab`.
* Added `audit:combinations`: 24 templates × 210 unordered 4-of-10 choices × 24 orderings = **120,960 static combinations**; plus module-renderer case and creative-director consistency checks.
* Added `audit:imports`: 88 app/build source files scanned, 135 local imports resolved, 28 directly imported external dependency names declared.
* Added 3 integration tests: all 24 template CLI dry-runs, product-specific GLB and conceptual 3D configuration, and invalid product specification rejection. There are now 10 Node tests.
* Hardened `site:new` against duplicate IDs, path traversal, negative prices and incomplete purchase URLs.
* Added Google AI Studio exact dependency list, phased verification prompt and fail-closed release gate; updated CI to upload production `dist` only on successful network-enabled typecheck and build.

**Local release status:** static/source tests pass. npm registry returned `EAI_AGAIN` here; no full dependency install, production build, browser/device performance or actual photoreal rendering was verified. These remain release gates to run on Codespaces/AI Studio.

**Upload instructions:** extract the complete ZIP into the GitHub repository **root**, not into a nested folder. Preserve hidden `.github/workflows/ci.yml`. User uploads; no GitHub files were modified by this release.
