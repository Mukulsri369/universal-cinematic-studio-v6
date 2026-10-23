# Media connectivity validation — 2026-10-23

Repository: `Mukulsri369/universal-cinematic-studio-v6`.
Working branch: `feature/realistic-media`. No changes to main.

| Check | Result |
| --- | --- |
| Environment secret accessibility | PASS: nonempty GEMINI_API_KEY; value never printed or written |
| HTTPS API connectivity | PASS: root GET returned HTTP 404; authenticated models GET returned HTTP 200 |
| Authentication | PASS: x-goog-api-key authenticated read-only GET /v1beta/models |
| Image model availability | PASS: models/gemini-3.1-flash-image present among 60 models across all pages |
| Interactions entitlement | UNVERIFIED: model listing advertises generateContent, countTokens, batchGenerateContent; it does not prove Interactions authorization or billing/quota availability |
| Parser and approval gating | PASS: 14 focused media tests; full npm test passed 31 tests |

No generation POST, paid request, image generation, or asset mutation was performed.
CLI tests replace fetch with a throwing stub before importing the generator and use a dummy key.
Hero selection is exactly one image. Without --execute it is a dry run; --execute without --approve-spend fails before fetch.

## Payload and parser review

Google documentation pages on ai.google.dev are blocked here by the network proxy (HTTP 403), including pricing.
The user's confirmation of model/endpoint support was supplemented by Google's official Python SDK source at commit `92f72b3a236a5bc56e8e3327ab9563f77dd119c3`:

- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/imageresponseformat.py
- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/interaction.py
- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/imagecontent.py

Request retains model/input and response_format type=image, aspect_ratio=16:9 for hero, image_size=2K.
Added delivery=inline; removed optional forced image/png MIME because SDK lists image/jpeg as the explicit MIME option.
Writer chooses extension from returned raster bytes; output is not guaranteed to be PNG.
Parser handles output_image, model_output step content, and compatibility outputs arrays.
It rejects missing inline images, malformed structures/base64, unsupported raster signatures, MIME mismatches, noncompleted interactions, invalid JSON, and API errors.
HTTP errors report only status and asset ID, never remote bodies.
Raster header validation is not a full image decoder or visual quality review.

## Remaining before one hero generation

No missing key or model configuration was observed. Account Interactions entitlement, billing and quota remain unverified without generation.
Current pricing could not be independently retrieved. A prior approximate standard 2K output estimate is US$0.101 per image, plus input/other token charges; this is NOT verified as the current published price. Confirm https://ai.google.dev/gemini-api/docs/pricing before cost approval.
Implementation is ready for an explicitly authorized single-hero attempt, subject to those account/pricing uncertainties.
Generation remains stopped pending user approval. Actual output must be reviewed before further images or visual-readiness claims.
