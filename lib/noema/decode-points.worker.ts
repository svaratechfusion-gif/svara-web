/**
 * Web Worker wrapper around `decodePointCloud`.
 *
 * The decode is pure but expensive: 50 000 points, each getting a PCA plane fit
 * over its neighbourhood. On the main thread that lands as a multi-hundred-
 * millisecond stall exactly while the hero is springing in — the one moment the
 * page must not drop frames.
 *
 * So it runs here instead. The input buffer is transferred in (the main thread
 * is done with it) and the decoded attribute arrays are transferred back out, so
 * nothing of consequence is copied in either direction.
 *
 * Consumed by `load.ts`, which falls back to decoding inline if Workers are
 * unavailable or the module fails to construct.
 */

import { decodePointCloud } from './decode-points'
import type { PointCloudManifest } from './types'

export interface DecodeRequest {
  manifest: PointCloudManifest
  buffer: ArrayBuffer
}

/** The slice of the worker global this file uses. Declared locally rather than
 *  pulling the `webworker` lib into a DOM tsconfig, where the two disagree. */
interface WorkerScope {
  addEventListener(type: 'message', listener: (event: MessageEvent<DecodeRequest>) => void): void
  postMessage(message: unknown, transfer?: Transferable[]): void
}

const scope = self as unknown as WorkerScope

scope.addEventListener('message', (event: MessageEvent<DecodeRequest>) => {
  try {
    const { manifest, buffer } = event.data
    const cloud = decodePointCloud(manifest, buffer)
    scope.postMessage({ ok: true, cloud }, [cloud.positions.buffer, cloud.normals.buffer])
  }
  catch (error) {
    scope.postMessage({
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
