/**
 * Bunny Stream integration — pulls the reel library at request/build time so
 * adding, removing, or relabeling a video in the Bunny dashboard shows up on
 * the site without any code change or redeploy trigger from us.
 *
 * Segregation convention: set each video's "Description" field in Bunny to
 * either just a client name (e.g. "Sarvatra Energy"), or "Client | Category"
 * (e.g. "Sarvatra Energy | Brand Film") if you want a specific category tag
 * instead of the "Client Work" default.
 */

export interface BunnyReel {
  id: string
  /** Small, muted 240p loop — used for the autoplaying background cards. */
  src: string
  /** Higher-quality 720p version with audio — used for click-to-watch playback. */
  fullSrc: string
  poster: string
  client: string
  category: string
  /**
   * The upload filename Bunny kept as the video title. Uploads are named after
   * the client's Instagram handle, so the portfolio matches videos to clients by
   * this even when the Description field was never filled in.
   */
  title: string
}

interface BunnyVideoApiItem {
  guid: string
  title: string | null
  description: string | null
  status: number
  encodeProgress: number
}

// Corrects known typos/casing in Bunny video descriptions without needing a re-upload.
const CLIENT_NAME_FIXES: Record<string, string> = {
  'vimal international': 'Vimla International',
  'sarvatra energy': 'Sarvatra Energy',
}

function normalizeClient(raw: string): string {
  const fixed = CLIENT_NAME_FIXES[raw.toLowerCase()]
  return fixed ?? raw
}

export async function getBunnyReels(): Promise<BunnyReel[]> {
  const cdnHost = process.env.BUNNY_CDN_HOSTNAME
  const libraryId = process.env.BUNNY_LIBRARY_ID
  const apiKey = process.env.BUNNY_STREAM_API_KEY

  if (!cdnHost || !libraryId || !apiKey) return []

  let data: { items: BunnyVideoApiItem[] }
  try {
    const res = await fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos?page=1&itemsPerPage=100`,
      {
        headers: { AccessKey: apiKey, accept: 'application/json' },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) return []
    data = await res.json()
  } catch {
    return []
  }

  return data.items
    .filter((v) => v.status === 4 && v.encodeProgress === 100)
    .map((v): BunnyReel => {
      const raw = v.description?.trim()
      const [clientRaw, categoryRaw] = raw ? raw.split('|').map((s) => s.trim()) : []
      return {
        id: v.guid,
        src: `https://${cdnHost}/${v.guid}/play_240p.mp4`,
        fullSrc: `https://${cdnHost}/${v.guid}/play_720p.mp4`,
        poster: `https://${cdnHost}/${v.guid}/thumbnail.jpg`,
        client: clientRaw ? normalizeClient(clientRaw) : 'Rogue Studio',
        category: categoryRaw || 'Client Work',
        title: v.title?.trim() ?? '',
      }
    })
}

/**
 * Does this Bunny video belong to any of `matches`?
 *
 * Checks the title (the upload filename, e.g. "averaclothing.in_1789051035…") and
 * the Description, so a video is found whether it was tagged by hand in the Bunny
 * dashboard or just uploaded under its original filename. Separators are
 * normalised away because handles vary in punctuation (@sira.collection._).
 *
 * A client can list several keys: reels reposted from another account upload under
 * that account's handle, and the older library entries are tagged by description
 * ("Naman Vaastu") rather than named after a handle.
 */
const normalizeKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

export function reelBelongsTo(reel: BunnyReel, matches: string[]): boolean {
  const title = normalizeKey(reel.title)
  const client = normalizeKey(reel.client)
  return matches.some((m) => {
    const key = normalizeKey(m)
    return key !== '' && (title.startsWith(key) || client === key)
  })
}

/** Fisher-Yates shuffle — returns a new array, doesn't mutate the input. */
export function shuffleReels(reels: BunnyReel[]): BunnyReel[] {
  const shuffled = [...reels]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
