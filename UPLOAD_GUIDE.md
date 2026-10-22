# GitHub root upload: v6

The user will do the GitHub upload. This package has **not** been uploaded automatically.

1. Extract `Universal_Cinematic_Studio_v6_COMPLETE.zip`.
2. In the GitHub repository, upload the ZIP **contents** into the repository root, preserving folders and hidden files. Commit only after checking which existing files will be replaced.
3. Ensure the root contains `package.json`, `src/`, `scripts/`, `docs/`, `site-templates.json`, `composition-recipes.json`, `AGENTS.md`, `README.md`, `.github/`.
4. Once GitHub is updated, use Google AI Studio Build Mode → Add files (+) → Import from GitHub. Paste the edited `PROMPT_ONE_CLICK_CINEMATIC_SITE.md`.
5. Verify npm dependency installation, source checks, production build and actual rendering on a phone and desktop before publishing.

If uploading a large number of folders through the GitHub browser UI is difficult, Git via local clone/add/commit/push preserves the full structure more reliably. Do not upload only the ZIP file expecting AI Studio to import its unextracted contents as a project.
