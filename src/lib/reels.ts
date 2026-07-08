/**
 * Reel asset path helpers.
 *
 * Local reels under /public/reels/<name>.mp4 have two derived assets generated
 * by the ffmpeg pass:
 *   • a short, muted, low-res preview loop at /reels/preview/<name>.mp4
 *     (used for autoplaying backgrounds — tiny + cheap to decode)
 *   • a poster frame at /reels/posters/<name>.jpg (instant first paint)
 *
 * The full file (/reels/<name>.mp4) is reserved for click-to-watch playback
 * (e.g. the portfolio lightbox), where quality + audio matter.
 *
 * Bunny Stream reels are already a small, ready-to-play URL (e.g.
 * .../<guid>/play_240p.mp4) — no local transform applies, so these just
 * derive the matching thumbnail URL instead.
 */
const BUNNY_URL = /^https:\/\/([^/]+\.b-cdn\.net)\/([a-f0-9-]+)\//i

export const reelPreview = (src: string): string => {
  if (BUNNY_URL.test(src)) return src
  return src.replace('/reels/', '/reels/preview/')
}

export const reelPoster = (src: string): string => {
  const bunnyMatch = src.match(BUNNY_URL)
  if (bunnyMatch) {
    const [, host, guid] = bunnyMatch
    return `https://${host}/${guid}/thumbnail.jpg`
  }
  return src.replace('/reels/', '/reels/posters/').replace(/\.mp4$/i, '.jpg')
}
