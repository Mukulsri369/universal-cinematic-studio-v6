# Safe GitHub upload / update

**Repo:** https://github.com/Mukulsri369/universal-ai-development-toolkit

## Browser approach
- Extract the complete ZIP, then open the inner `universal-ai-development-toolkit` folder. **Do not upload the outer folder itself**. Open your repository's **Add file → Upload files**, and drag selected files + folders to the drop zone.
- GitHub's "Choose your files" picker often cannot select folders: use drag-and-drop. Hidden `.github/` can be difficult on mobile. Files with an existing path are updates and may need review; keep the content from this new archive.
- Commit changes, then confirm `package.json`, `src`, `scripts`, `docs`, `design-system`, `component-manifest.json` and `.github` appear at repository root.
- Never upload `node_modules`, credentials, `.env` files or generated `dist` directories.

## Recommended git approach to replace/update existing code (requires Git + login)
```sh
git clone https://github.com/Mukulsri369/universal-ai-development-toolkit.git
cd universal-ai-development-toolkit
# COPY CONTENTS of extracted archive's inner folder into THIS directory, preserving folders and hidden .github
git add -A
git commit -m "Expand universal creative toolkit and AI Studio workflows"
git push origin main
```
Cloning first retains your existing repository history. Do not delete and recreate the repository again.
