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
  src: string
  poster: string
  client: string
  category: string
}

interface BunnyVideoApiItem {
  guid: string
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
        poster: `https://${cdnHost}/${v.guid}/thumbnail.jpg`,
        client: clientRaw ? normalizeClient(clientRaw) : 'Rogue Studio',
        category: categoryRaw || 'Client Work',
      }
    })
}
