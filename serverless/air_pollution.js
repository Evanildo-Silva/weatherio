import fetch from "node-fetch"

const API_KEY = process.env.OPEN_WEATHER_API_KEY

export async function handler(event, context) {
    try {
        const { lat, lon } = JSON.parse(event.body)
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}&appid=${API_KEY}&lang=pt_br`

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