import fetch from "node-fetch"

const { OPEN_WEATHER_API_KEY } = process.env

export async function handler(event, context) {
    try {
        const { lat, lon } = JSON.parse(event.body)
        const url = `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}&lang=pt_br`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}