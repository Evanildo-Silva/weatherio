/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict';

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