# Google AI Studio workflow — reuse actual code

1. Upload all files of this ZIP into the **root** of GitHub repository `Mukulsri369/universal-ai-development-toolkit` (or push with git). Keep folders intact; do not upload the ZIP as a single file.
2. In Google AI Studio Build Mode, choose `Add files (+) → Import from GitHub` and select the repository. Depending on the UI and access, connect/authorize GitHub as prompted. Check the code view: `src/cinematic/CinematicStorefront.tsx` and `package.json` must be present.
3. The imported app initially presents a working-style cinematic product demo at `/`; existing component catalog at `/?view=toolkit`.
4. Read and paste `AI_STUDIO_CINEMATIC_PROMPT.md`, filling in brand, product category, actual product images/models and checkout destinations.
5. Ask the agent to execute install, verify, typecheck and build. A GitHub import gives code, not persistent installed tools across unrelated projects. It may need npm install in the new environment.
6. Review generated designs for motion quality, legibility, speed, licensing and real stock/prices. Do not assume the model did anything not visible in code, dependencies and a successful runtime preview.

Documentation: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
