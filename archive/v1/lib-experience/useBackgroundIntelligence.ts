type BISApi = {
  setSceneIndex?: (i: number) => void;
  focusArea?: (x: number, z: number) => void;
  dispose?: () => void;
};

let api: BISApi | null = null;

export function registerBackgroundIntelligence(impl: BISApi) {
  api = impl;
}

export function getBackgroundIntelligence() {
  if (!api) throw new Error('BackgroundIntelligence not registered');
  return api;
}

export function tryGetBackgroundIntelligence() {
  return api;
}
