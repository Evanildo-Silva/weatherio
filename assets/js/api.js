/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict';

/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback Callback function
 */
export const fetchData = async function (URL, callback) {
    try {
        const response = await fetch("./.netlify/funtions/api", {
            method: "POST",
            body: URL
        })

        const responseJson = await response.json()
        callback(responseJson)
        return responseJson

    } catch (error) {
        console.error(error)
    }
}

export const url = {
    /**
     * 
     * @param {number} lat Latitude
     * @param {number} lon Longitude
     */
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
    },
    /**
     * 
     * @param {number} lat Latitude
     * @param {number} lon Longitude
     */
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
    /**
     * 
     * @param {number} lat Latitude
     * @param {number} lon Longitude
     */
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    /**
     * 
     * @param {string} query Search query e.g.: "Fortaleza", "Brasília"
     */
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    },
    /**
     * 
     * @param {number} lat Latitude
     * @param {number} lon Longitude
     */
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
}