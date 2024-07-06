const fetch = require('node-fetch');

// Define tu clave de API aquí (puedes cambiar esto por process.env.OPENWEATHERMAP_API_KEY si prefieres usar variables de entorno)
const apiKey = 'c7d28cbb12f0c76d4763f5b83e9ef6ac';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { latitude, longitude } = req.query; // Obtiene latitud y longitud del query string

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitud y longitud no proporcionadas.' });
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error en la solicitud al servidor del clima.');
            }
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error al obtener el clima:', error);
            res.status(500).json({ error: 'No se pudo obtener el clima.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
