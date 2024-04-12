export const currentWeather = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/current_weather`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                lat,
                lon,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Erro ao executar a função:", error);
    }
};

export const reverseGeo = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/reserse_geo`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                lat,
                lon,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Erro ao executar a função:", error);
    }
};

export const airPollution = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/air_pollution`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                lat,
                lon,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Erro ao executar a função:", error);
    }
};

export const forecast = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/forecast`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                lat,
                lon,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Erro ao executar a função:", error);
    }
};

export const geo = async function (query, callback) {
    try {
        const response = await fetch(`./.netlify/functions/geo`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                query
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Erro ao executar a função:", error);
    }
};