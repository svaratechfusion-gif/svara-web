# Draco decoder — copied from `three`, do not hand-edit

These files are `node_modules/three/examples/jsm/libs/draco/**` verbatim, for the
version of three in package.json. They decode the Draco-compressed GLBs used by the
Stride block (`lib/stride/chrome-model.ts`).

They are copied rather than imported because `DRACOLoader` resolves its decoder
relative to `import.meta.url`, which under Vite points into the pre-bundled dep cache
(`node_modules/.cache/vite/client/`) — Vite puts the JS module there but not the
sibling `.wasm`/`.js` assets, so the decoder 404s.

**On a `three` upgrade, re-copy them:**

```sh
cp node_modules/three/examples/jsm/libs/draco/{draco_decoder.js,draco_decoder.wasm,draco_wasm_wrapper.js} public/draco/
cp -R node_modules/three/examples/jsm/libs/draco/gltf public/draco/gltf
```

A decoder from a different three version than the loader fails with
"THREE.DRACOLoader: Unexpected geometry type."
