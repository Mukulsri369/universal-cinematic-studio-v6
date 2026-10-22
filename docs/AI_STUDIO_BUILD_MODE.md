# Google AI Studio Build Mode: importing and reusing this toolkit

Verified against official [AI Studio Build Mode documentation](https://ai.google.dev/gemini-api/docs/aistudio-build-mode) (October 2026): in Build mode click **+ Add files** in the prompt box → **Import from GitHub** → select `Mukulsri369/universal-ai-development-toolkit`. This imports real code into an editable app environment; pasting a GitHub URL alone does NOT import source. GitHub settings can provide two-way sync with an existing repo.

## First-time steps
1. Push all source files, *including hidden `.github` folder*, to the GitHub repo root. Confirm `package.json`, `src/`, `scripts/`, `docs/`, and `component-manifest.json` are visible.
2. In AI Studio Build, **Import from GitHub** using the + menu. Review the imported file tree in Code. AI Studio may adapt project files; check component imports after adaptation.
3. Paste `AI_STUDIO_STARTER_PROMPT.md` into the chat. Ask the agent to inspect `AGENTS.md` and `component-manifest.json`, install declared runtime dependencies when needed, and validate compilation. For new apps, instruct the agent to preserve this kit's reusable source, not replace it with a blank project.
4. Run the app preview. Verify dependencies actually resolve; `npm install` is an environment action, not a side-effect of giving a link. For optional marketplace assets, choose specific components, check licenses, and install with supported CLI in a terminal or manually import source.
5. For another site, import the same kit as a *starting project*, customize theme/content, then save output to a **different project repo** so the master toolkit is not overwritten.

## Important limitations
- UI UX Pro Max is an agent skill, not a runtime React package. `npx ui-ux-pro-max-cli init --ai gemini` targets Gemini CLI, not necessarily AI Studio Build agent. Build Mode should read the included design guidance plus your prompt. Install official skill in a compatible external agent when desired.
- 21st.dev is an independently maintained marketplace and API/CLI. It cannot be bulk-bundled or auto-installed by reference. The kit contains **self-authored** working components and CLI helpers for specific upstream additions; the whole marketplace is not included.
- Reuse actual project source. Run `npm run verify`, `npm run typecheck`, and `npm run build` after installation. If the AI Studio environment doesn't expose commands, ask its agent to perform validation and report the results honestly; check its code view.
- Keep credentials in platform secrets; do not embed tokens or API keys in a public repository.
