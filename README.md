# SimGen 资产库 · Sim-Ready Asset Library

Interactive web catalogue of Animis AI's simulation-ready assets — articulated
appliances and furniture from the Sketch2Arti pipeline, plus rigid logistics
assets with physics parameters.

**Live site:** https://animis-ai.github.io/asset-library/

- Every asset renders in-browser as a compressed glTF (`<model-viewer>`);
  orbit, zoom, play or scrub the joint animation.
- Articulated assets carry their real URDF joint types and limits; the web
  animation is the joint sweeping between its limits.
- `data/assets.json` is the machine-readable manifest.

Static site, no build step. Deployed by `.github/workflows/pages.yml` on every
push to `main`.
