export default function handler(req, res) {
    if (req.method === 'GET') {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                res.status(200).json({ ip: data.ip });
            })
            .catch(error => {
                console.error('Error al obtener la IP:', error);
                res.status(500).json({ error: 'No se pudo obtener la IP.' });
            });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
