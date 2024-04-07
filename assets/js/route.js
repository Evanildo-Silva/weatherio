/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict'

import { error404, updateWeather } from "./app.js"

const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

/**
 * Gets the user's current location
 */
const getCurrentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(function (res) {
        const { latitude, longitude } = res.coords

        updateWeather(`lat=${latitude}`, `lon=${longitude}`)
    }, function (err) {
        window.location.hash = defaultLocation
    })
}

/**
 * Searches for a location based on the given query
 * @param {string} query Searched query 
 */
const searchLocation = function (query) {
    return updateWeather(...query.split("&"))
}

const routes = new Map([
    ["/current-location", getCurrentLocation],
    ["/weather", searchLocation]
])

/**
 * Checks the route based on the URL hash
 */
const checkHash = function () {
    const requestURL = window.location.hash.slice(1)

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL]

    routes.get(route) ? routes.get(route)(query) : error404()
}

window.addEventListener("hashchange", checkHash)

window.addEventListener("load", () => {
    if (!window.location.hash) {
        window.location.hash = "#/current-location"
    } else {
        checkHash()
    }
})