# Integration matrix / upstream sources

| Tool | Actual integration | Where to find it | Extra work? |
|---|---|---|---|
| Motion | npm dependency and local React source components | `motion/react` | `npm install` |
| GSAP | npm dependency, magnetic button, counter, morphing blob | `gsap` | `npm install` |
| Three.js | npm dependency and source scenes | `three` | `npm install` |
| React Three Fiber + Drei | npm dependencies and THREE Canvas/controls | `src/components/scenes/` | `npm install` |
| shadcn/ui | shadcn-compatible `components.json` and editable **local original implementations** | `src/components/ui/` | official components via `npx shadcn@latest add NAME` |
| Lucide icons | `lucide-react` npm and UI source | App and showcase | `npm install` |
| Lenis | npm dependency and SmoothScroll source | `src/components/creative/SmoothScroll.tsx` | `npm install` |
| UI UX Pro Max | Official agent skill install CLI + self-authored design preset rules | `design-system/`, `scripts/install-skills.mjs` | needs CLI install for **supported** agent |
| 21st.dev | Marketplace search/add CLI wrapper and instructions | `scripts/21st.mjs` | choose and install components individually (may need login) |

Official references:
- Motion https://motion.dev/docs/react-installation
- GSAP https://gsap.com/docs/v3/Installation/
- Three https://threejs.org/docs/
- React Three Fiber https://r3f.docs.pmnd.rs/
- shadcn/ui https://ui.shadcn.com/docs/installation/vite
- Lenis https://github.com/darkroomengineering/lenis
- Lucide https://lucide.dev/guide/packages/lucide-react
- UI UX Pro Max https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- 21st skills https://github.com/21st-dev/skill
- AI Studio GitHub import https://ai.google.dev/gemini-api/docs/aistudio-build-mode

**21st commands (network + possibly auth needed):**

```sh
npx @21st-dev/cli login
npm run 21st:search -- "animated hero"
npm run 21st:add -- author/slug
```

**UI UX Pro Max in external agent:**
```sh
npx ui-ux-pro-max-cli init --ai universal
# or in Gemini CLI:
npx ui-ux-pro-max-cli init --ai gemini
```
These commands require external network permissions and should be reviewed before running. The skill is not automatically attached to Build Mode just because files are in GitHub.
