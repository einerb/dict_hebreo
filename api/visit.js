module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(503).json({ error: 'Redis no configurado' });
  }

  const pipeline = (commands) =>
    fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    }).then((r) => r.json());

  const ref = req.headers.referer || req.query.ref || '';
  let referrer = 'direct';
  try {
    const hostname = new URL(ref).hostname;
    if (hostname) referrer = hostname;
  } catch {}

  const today = new Date().toISOString().split('T')[0];

  const results = await pipeline([
    ['INCR', 'visits:total'],
    ['HINCRBY', 'visits:referrers', referrer, 1],
    ['HINCRBY', 'visits:daily', today, 1],
  ]);

  res.status(200).json({ total: Number(results[0]?.result ?? 0) });
};
