module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
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

    const results = await pipeline([
      ['GET',    'visits:total'],
      ['HGETALL','visits:referrers'],
      ['HGETALL','visits:daily'],
    ]);

    const toObj = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return {};
      const obj = {};
      for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = Number(arr[i + 1]);
      return obj;
    };

    res.status(200).json({
      total:     Number(results[0]?.result) || 0,
      referrers: toObj(results[1]?.result),
      daily:     toObj(results[2]?.result),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
