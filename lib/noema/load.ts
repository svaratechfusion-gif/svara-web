/**
 * Fetch a point-cloud manifest + its binary buffer and decode it once.
 *
 * The manifest URL is passed in — the scene never guesses an asset path, and it
 * always resolves the buffer FROM the manifest rather than from a second guess.
 */

import { decodePointCloud, type DecodedPointCloud } from './decode-points'
import type { PointCloudManifest } from './types'

interface DecodeResponse {
  ok: boolean
  cloud?: DecodedPointCloud
  message?: string
}

const resolveBufferUrl = (manifestUrl: string, file: string): string =>
  new URL(file, new URL(manifestUrl, window.location.href)).href

/**
 * Decode off the main thread, falling back to an inline decode when Workers are
 * unavailable or the module fails to construct — a stall is still better than no
 * head. `onWorker` hands the instance back so the caller can terminate it on
 * unmount.
 */
const decode = (
  manifest: PointCloudManifest,
  buffer: ArrayBuffer,
  onWorker: (worker: Worker) => void,
): Promise<DecodedPointCloud> => {
  if (typeof Worker === 'undefined') return Promise.resolve(decodePointCloud(manifest, buffer))

  return new Promise<DecodedPointCloud>((resolve, reject) => {
    let worker: Worker
    try {
      worker = new Worker(new URL('./decode-points.worker.ts', import.meta.url), { type: 'module' })
    }
    catch {
      resolve(decodePointCloud(manifest, buffer))
      return
    }
    onWorker(worker)

    worker.addEventListener('message', (event: MessageEvent<DecodeResponse>) => {
      const { ok, cloud, message } = event.data
      worker.terminate()
      if (ok && cloud) resolve(cloud)
      else reject(new Error(message ?? 'failed to decode the point cloud'))
    })
    worker.addEventListener('error', () => {
      worker.terminate()
      // The buffer was transferred away, so there is nothing to retry with.
      reject(new Error('point-cloud decode worker failed'))
    })

    worker.postMessage({ manifest, buffer }, [buffer])
  })
}

export interface PointCloudHandle {
  cloud: DecodedPointCloud
}

/**
 * Load + decode the cloud at `manifestUrl`. `signal` aborts the fetches;
 * `onWorker` receives the decode worker so the caller can terminate it.
 */
export const loadPointCloud = async (
  manifestUrl: string,
  signal: AbortSignal,
  onWorker: (worker: Worker) => void,
): Promise<DecodedPointCloud> => {
  const manifestRes = await fetch(manifestUrl, { signal })
  if (!manifestRes.ok) throw new Error(`failed to load manifest (${manifestRes.status})`)
  const manifest = (await manifestRes.json()) as PointCloudManifest

  const object = manifest.objects[0]
  if (!object) throw new Error('manifest has no objects')

  const bufferRes = await fetch(resolveBufferUrl(manifestUrl, object.file), { signal })
  if (!bufferRes.ok) throw new Error(`failed to load points (${bufferRes.status})`)
  const buffer = await bufferRes.arrayBuffer()

  return decode(manifest, buffer, onWorker)
}
