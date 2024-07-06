export default function handler(req, res) {
    if (req.method === 'GET') {
        const ip = req.query.ip; // Obtiene la IP del query string

        if (!ip) {
            return res.status(400).json({ error: 'IP no proporcionada.' });
        }

        fetch(`https://ipapi.co/${ip}/json/`)
            .then(response => response.json())
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                console.error('Error al obtener la ubicación:', error);
                res.status(500).json({ error: 'No se pudo obtener la ubicación.' });
            });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
