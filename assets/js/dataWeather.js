/**
* @fileoverview All api related stuff like api_key, api request etc.
* @copyright Evanildo-Silva 2024 All rights reserved
* @author Evanildo-Silva <evanildo.sf91@gmail.com>
*/


'use strict';

/**
 * Makes a request to obtain weather data based on geographic coordinates.
 * @param {number} lat Latitude of desired location.
 * @param {number} lon Longitude of desired location..
 * @param {function} callback Callback function that will be called with the weather data.
 * @throws {Error} If there is an error in the request or if the response is not "ok".
 */
export const currentWeather = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/current_weather`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                lat,
                lon,
            })
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

/**
 * Makes a request to obtain location data based on geographic coordinates.
 * @param {number} lat Latitude of desired location.
 * @param {number} lon Longitude of desired location..
 * @param {function} callback Callback function that will be called with the weather data.
 * @throws {Error} If there is an error in the request or if the response is not "ok".
 */
export const reverseGeo = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/reverse_geo`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                lat,
                lon,
            })
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

/**
 * Fetches air pollution data based on latitude and longitude coordinates.
 * @param {number} lat Latitude in decimal degrees.
 * @param {number} lon Longitude in decimal degrees.
 * @param {function} callback Callback function to handle the fetched data.
 * @throws {Error} If there is an error in the request or if the response is not "ok".
 */
export const airPollution = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/air_pollution`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                lat,
                lon,
            })
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

/**
 * Fetches weather forecast data based on latitude and longitude coordinates.
 * @param {number} lat Latitude in decimal degrees.
 * @param {number} lon Longitude in decimal degrees.
 * @param {function} callback Callback function to handle the fetched data.
 * @throws {Error} If there is an error in the request or if the response is not "ok".
 */
export const forecast = async function (lat, lon, callback) {
    try {
        const response = await fetch(`./.netlify/functions/forecast`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                lat,
                lon,
            })
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

/**
 * Fetches geographical data based on a query.
 * @param {string} query The search query (e.g., location name, address).
 * @param {function} callback Callback function to handle the fetched data.
 * @throws {Error} If there is an error in the request or if the response is not "ok".
 */
export const geo = async function (query, callback) {
    try {
        const response = await fetch(`./.netlify/functions/geo`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                query
            })
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