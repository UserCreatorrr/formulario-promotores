const N8N_WEBHOOK = 'https://esencia-paradise-n8n.rh6pum.easypanel.host/webhook-test/b8600a5f-dfb1-4d58-a9e7-019a73ce28a0';

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const response = await fetch(N8N_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const text = await response.text();
        res.status(response.status).send(text || 'ok');
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
