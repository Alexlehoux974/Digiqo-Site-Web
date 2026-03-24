import type { NextApiRequest, NextApiResponse } from 'next';

const requestCounts = new Map<string, { count: number; resetTime: number }>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60000; // 1 minute

/**
 * Check rate limit for an incoming request.
 * Returns true if the request is allowed, false if rate limited.
 * When rate limited, sends a 429 response automatically.
 */
export function checkRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): boolean {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
    : req.socket.remoteAddress || 'unknown';

  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || record.resetTime < now) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    res.status(429).json({ error: 'Trop de requêtes. Veuillez réessayer dans une minute.' });
    return false;
  }

  record.count++;
  return true;
}
