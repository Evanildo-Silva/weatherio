/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict';

const openWeatherApiKey = "12f0bc5202d0786b4cb326ee782cfdc7"


/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback Callback function
 */
export const fetchData = function (URL, callback) {
    fetch(`${URL}&appid=${openWeatherApiKey}`)
        .then(res => res.json())
        .then(data => callback(data))
}

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`
    },
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`
    },
    /**
     * 
     * @param {string} query Search query e.g: "Fortaleza", "Brasília"
     */
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}$limit=5`
    },
}