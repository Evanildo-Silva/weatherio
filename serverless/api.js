import fetch from "node-fetch";

const { OPEN_WEATHER_API_KEY } = process.env

exports.handler = async (event, context) => {
    const { URL } = event.body

    try {
        if (!URL) {
            throw new Error("URL are required parameters.");
        }
        const fetchData = await fetch(`${URL}&appid=${OPEN_WEATHER_API_KEY}&lang=pt_br`)
        const fetchDataJson = await fetchData.json()

        if (fetchDataJson.statusCode !== 200) {
            throw new Error(`API returned an error: ${data.message}`);
        }

        return {
            statusCode: 200,
            body: fetchDataJson
        }
    } catch (error) {
        return {
            statusCode: 422,
            body: error.stack
        }
    }
}