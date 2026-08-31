/**
 * Decodes a clip into an array of still frames, once, up front.
 *
 * Why not just seek the <video> under the pointer? A seek costs ~25–65ms, so
 * driving `currentTime` from a per-frame loop asks for a seek every ~16ms and
 * the decoder never settles — the picture lands late and unevenly, which reads
 * as judder. Decoded stills turn scrubbing into an array lookup, so the field
 * tracks the pointer at the full frame rate.
 *
 * Frames are captured at a fraction of the source resolution on purpose: the
 * halftone samples one pixel per cell (a ~1920px canvas at cell size 9 is only
 * ~107 cells across), so full-resolution stills would cost a lot of memory to
 * carry detail thrown away on the first draw.
 */

/** Capture width, px. Height follows the source's aspect. */
const FRAME_WIDTH = 320

/** Land on the last frame rather than past it, which would clamp to the end. */
const END_EPSILON = 1 / 60

function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    // Seeking to where we already are may never fire `seeked` — resolve now.
    if (Math.abs(video.currentTime - time) < 1e-4) {
      resolve()
      return
    }
    const done = () => {
      video.removeEventListener('seeked', done)
      resolve()
    }
    video.addEventListener('seeked', done)
    video.currentTime = time
  })
}

export interface CaptureFramesOptions {
  video: HTMLVideoElement
  /** How many stills to spread across the clip. */
  count: number
  /** Called as each frame lands, so callers can render what exists so far. */
  onFrame: (frame: ImageBitmap, index: number) => void
  /** Checked between frames so an unmount can stop the walk. */
  isCancelled: () => boolean
}

/**
 * Walk `video` end to end, handing back one decoded still per step.
 *
 * Frames arrive in order through `onFrame` rather than as a returned array, so
 * the caller can scrub the head of the clip while the tail is still decoding.
 * Leaves the video parked on its first frame.
 */
export async function captureFrames({ video, count, onFrame, isCancelled }: CaptureFramesOptions): Promise<void> {
  if (!Number.isFinite(video.duration) || count < 2) return

  const width = FRAME_WIDTH
  const height = Math.round((width * video.videoHeight) / video.videoWidth)
  const span = Math.max(video.duration - END_EPSILON, 0)

  for (let index = 0; index < count; index += 1) {
    if (isCancelled()) return

    await seekTo(video, (index / (count - 1)) * span)
    if (isCancelled()) return

    const frame = await createImageBitmap(video, {
      resizeWidth: width,
      resizeHeight: height,
      resizeQuality: 'high',
      // Not cosmetic: UNPACK_FLIP_Y_WEBGL has no effect on an ImageBitmap — its
      // own orientation wins — so a default bitmap uploads upside down next to
      // the <video> path, which does honour the flip. Baking the flip in here
      // lets both sources share one texture setup.
      imageOrientation: 'flipY',
    })
    if (isCancelled()) {
      frame.close()
      return
    }

    onFrame(frame, index)
  }

  await seekTo(video, 0)
}
