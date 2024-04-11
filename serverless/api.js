import fetch from "node-fetch";

const { OPEN_WEATHER_API_KEY } = process.env

exports.handler = async (event, context) => {
    try {
        const { URL, callback } = event.queryStringParameters;

        if (!URL) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "URL is a required parameter." })
            };
        }

        const completeURL = `api.openweathermap.org${URL}&appid=${OPEN_WEATHER_API_KEY}&lang=pt_br`;
        const fetchData = await fetch(completeURL);
        const fetchDataJson = await fetchData.json();

        if (fetchDataJson.statusCode !== 200) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: `API returned an error: ${fetchDataJson.message}` })
            };
        }

        callback(fetchDataJson);

        return {
            statusCode: 200,
            body: JSON.stringify(fetchDataJson)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.stack })
        };
    }
}