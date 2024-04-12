/**
 * @license MIT
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict'

import { airPollution, currentWeather, forecast, geo, reverseGeo } from "./dataWeather.js"
import * as module from "./module.js"

/**
 * Add event listener on multiole elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Event type e.g.: "click", "mouseover"
 * @param {Function} callback Callback function
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (const element of elements) {
        element.addEventListener(eventType, callback)
    }
}

/**
 * Toggle search in mobile devices
 */
const searchView = document.querySelector("[data-search-view]")
const searchTogglers = document.querySelectorAll("[data-search-toggle]")

const toggleSearch = function () {
    searchView.classList.toggle("active")
}


addEventOnElements(searchTogglers, "click", toggleSearch)

/**
 * Seaech Intergration
 */
const searchField = document.querySelector("[data-search-field]")
const searchResult = document.querySelector("[data-search-result]")

let searchTimeout = null
const searchTimeoutDuration = 500

searchField.addEventListener("input", function () {
    searchTimeout ?? clearTimeout(searchTimeout)

    if (!searchField.value) {
        searchResult.classList.remove("active")
        searchResult.innerHTML = ""
        searchField.classList.remove("searching")
    } else {
        searchField.classList.add("searching")
    }

    if (searchField.value) {
        searchTimeout = setTimeout(() => {
            geo(searchField.value, function (locations) {
                searchField.classList.remove("searching")
                searchResult.classList.add("active")
                searchResult.innerHTML = `
                    <ul class="view-list" data-search-list></ul>
                `
                const /** {NodeList} | [] */ items = []

                for (const { name, lat, lon, country, state } of locations) {
                    const searchItem = document.createElement("li")
                    searchItem.classList.add("view-item")

                    searchItem.innerHTML = `
                        <span class="m-icon">location_on</span>

                            <div>
                                <p class="item-title">${name}</p>

                                <p class="label-2 item-subtitle">${state || ""}, ${country}</p>
                            </div>

                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggle></a>
                    `

                    searchResult.querySelector("[data-search-list]").appendChild(searchItem)
                    items.push(searchItem.querySelector("[data-search-toggle]"))
                }

                addEventOnElements(items, "click", function () {
                    toggleSearch()
                    searchResult.classList.remove("active")
                })

            })
        }, searchTimeoutDuration)
    }

})

const container = document.querySelector("[data-container]")
const loading = document.querySelector("[data-loading]")
const currentLocationBtn = document.querySelector("[data-current-location-btn]")
const errorContent = document.querySelector("[data-error-content]")

/**
 * Render all weather data in html
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = function (lat, lon) {
    loading.style.display = "grid"
    container.style.overflowY = "hidden"
    container.classList.remove("fade-in")
    errorContent.style.display = "none"

    const currentWeatherSection = document.querySelector("[data-current-weather]")
    const highlightSection = document.querySelector("[data-highlights]")
    const hourlySection = document.querySelector("[data-hourly-forecast]")
    const forecastSection = document.querySelector("[data-5-day-forecast]")

    currentWeatherSection.innerHTML = ""
    highlightSection.innerHTML = ""
    hourlySection.innerHTML = ""
    forecastSection.innerHTML = ""

    if (window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "")
    } else {
        currentLocationBtn.removeAttribute("disabled")
    }

    currentWeather(lat, lon, function (currentWeather) {

        const {
            weather,
            dt: dateUnix,
            sys: {
                sunrise: sunriseUnixUTC,
                sunset: sunsetUnixUTC
            },
            main: {
                temp,
                feels_like,
                pressure,
                humidity
            },
            visibility,
            timezone
        } = currentWeather

        const [{
            description, icon
        }] = weather

        const card = document.createElement("div")
        card.classList.add("card", "card-lg", "current-weather-card")

        card.innerHTML = `
            <h2 class="title-2 card-title">Clima atual</h2>

            <div class="wrapper-heading">
                <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>

                <img class="weather-icon" width="64" height="64" src="./assets/images/weather_icons/${icon}.png"
                    alt="${description}">
            </div>

            <p class="body-3">${description}</p>

            <ul class="meta-list">
                <li class="meta-item">
                    <span class="m-icon">calendar_today</span>

                    <p class="title-3 meta-text">${module.getDate(dateUnix, timezone)}</p>
                </li>

                <li class="meta-item">
                    <span class="m-icon">location_on</span>

                    <p class="title-3 meta-text" data-location></p>
                </li>
            </ul>
        `
        reverseGeo(lat, lon, function ([{ name, country }]) {
            card.querySelector("[data-location]").innerHTML = `${name}, ${country}`
        })

        currentWeatherSection.appendChild(card)

        airPollution(lat, lon, function (airPollution) {

            const [{
                main: {
                    aqi
                },
                components: {
                    co,
                    no,
                    no2,
                    o3,
                    so2,
                    pm2_5
                }
            }] = airPollution.list

            const card = document.createElement("div")
            card.classList.add("card", "card-lg")

            card.innerHTML = `
                <h2 class="title-2">Insights Meteorológicos</h2>

                <div class="highlight-list">

                    <div class="card card-sm highlight-card one">

                        <h3 class="title-3">Taxa Qualidade do Ar</h3>

                        <div class="wrapper">

                            <span class="m-icon">air</span>

                            <ul class="card-list">
                                <li class="card-item">

                                    <p class="title-1">${pm2_5.toPrecision(3)}</p>

                                    <p class="label-1">PM<sub>2.5</sub></p>

                                </li>

                                <li class="card-item sun">

                                    <p class="title-1">${so2.toPrecision(3)}</p>

                                    <p class="label-1">SO<sub>2</sub></p>

                                </li>

                                <li class="card-item">

                                    <p class="title-1">${no2.toPrecision(3)}</p>

                                    <p class="label-1">NO<sub>2</sub></p>

                                </li>

                                <li class="card-item">

                                    <p class="title-1">${o3.toPrecision(3)}</p>

                                    <p class="label-1">O<sub>3</sub></p>

                                </li>

                            </ul>

                        </div>

                        <span class="badge aqi-${aqi} label-${aqi}" title="${module.aqiText[aqi].message}">
                            ${module.aqiText[aqi].level}
                        </span>

                    </div>

                    <div class="card card-sm highlight-card two">

                        <h3 class="title-3">Nascer do sol & Pôr do sol</h3>

                        <div class="card-list">

                            <div class="card-item">

                                <span class="m-icon">clear_day</span>

                                <div>

                                    <p class="label-1">Nascer do sol</p>

                                    <p class="title-1">${module.getTime(sunriseUnixUTC, timezone)}</p>

                                </div>

                            </div>

                            <div class="card-item">

                                <span class="m-icon">clear_night</span>

                                <div>

                                    <p class="label-1">Pôr do sol</p>

                                    <p class="title-1">${module.getTime(sunsetUnixUTC, timezone)}</p>

                                </div>

                            </div>


                        </div>

                    </div>

                    <div class="card card-sm highlight-card">

                        <h3 class="title-3">Umidade</h3>

                        <div class="wrapper">

                            <span class="m-icon">humidity_percentage</span>

                            <p class="title-1">${humidity}<sub>%</sub></p>

                        </div>

                    </div>

                    <div class="card card-sm highlight-card">

                        <h3 class="title-3">Pressão</h3>

                        <div class="wrapper">

                            <span class="m-icon">airwave</span>

                            <p class="title-1">${pressure}<sub>mb</sub></p>

                        </div>
                    </div>

                    <div class="card card-sm highlight-card">

                        <h3 class="title-3">Visibilidade</h3>

                        <div class="wrapper">

                            <span class="m-icon">visibility</span>

                            <p class="title-1">${visibility / 1000}<sub>km</sub></p>

                        </div>

                    </div>

                    <div class="card card-sm highlight-card">

                        <h3 class="title-3">Sensação Térmica</h3>

                        <div class="wrapper">

                            <span class="m-icon">thermostat</span>

                            <p class="title-1">${parseInt(feels_like)}&deg<sup>c</sup></p>

                        </div>

                    </div>

                </div>
            `
            highlightSection.appendChild(card)

        })

        forecast(lat, lon, function (forecast) {

            const {
                list: forecastList,
                city: {
                    timezone,
                }
            } = forecast

            hourlySection.innerHTML = `
                <h2 class="title-2">Hoje às</h2>

                <div class="slider-container">

                    <ul class="slider-list" data-temp></ul>

                    <ul class="slider-list" data-wind></ul>

                </div>
            `

            for (const [index, data] of forecastList.entries()) {

                if (index > 7) break

                const {
                    dt: dataTimeUnix,
                    main: {
                        temp
                    },
                    weather,
                    wind: {
                        deg: windDirection,
                        speed: windSpeed
                    }
                } = data

                const [{ description, icon }] = weather

                const temperatureItemList = document.createElement("li")
                temperatureItemList.classList.add("slider-item")

                temperatureItemList.innerHTML = `
                    <div class="card card-sm slider-card">

                        <p class="body-3">${module.getTime(dataTimeUnix, timezone)}</p>

                        <img class="weather-icon" src="./assets/images/weather_icons/${icon}.png" width="48"
                            height="48" loading="lazy" alt="${description}" title="${description}">

                        <p class="body-3">${parseInt(temp)}&deg<sup>c</sup></p>

                    </div>
                `

                hourlySection.querySelector("[data-temp]").appendChild(temperatureItemList)

                const windItemlist = document.createElement("li")
                windItemlist.classList.add("slider-item")

                windItemlist.innerHTML = `
                    <div class="card card-sm slider-card">
                    
                        <p class="body-3">${module.getTime(dataTimeUnix, timezone)}</p>
                        
                        <img class="weather-icon" src="./assets/images/weather_icons/direction.png"
                        width="48" height="48" loading="lazy" alt="direção" style="transform: rotate(${windDirection - 180}deg)">
                        
                        <p class="body-3">${parseInt(module.mps_to_kmh(windSpeed))}<sub>km/h</sub></p>
                    
                    </div>
                `

                hourlySection.querySelector("[data-wind]").appendChild(windItemlist)

            }


            forecastSection.innerHTML = `
            <h2 class="title-2" id="forecast-label">Previsão de 5 dias</h2>

            <div class="card card-lg forecast-card">
            
                <ul data-forecast-list></ul>

            </div>
            `


            for (let i = timezone < 0 ? 3 : 7, length = forecastList.length; i < length; i += 8) {
                const {
                    main: {
                        temp_max
                    },
                    weather,
                    dt_txt
                } = forecastList[i]

                const [{ description, icon }] = weather
                const date = new Date(dt_txt)

                const itemList = document.createElement("li")
                itemList.classList.add("card-item")

                itemList.innerHTML = `
                <div class="icon-wrapper">

                <img class="weather-icon" src="./assets/images/weather_icons/${icon}.png" width="36"
                height="36" alt="${description}" title="${description}">
                
                <span class="span">
                
                <p class="title-2">${parseInt(temp_max)}&deg<sup>c</sup></p>
                
                </span>
                
                </div>
                
                <p class="label-1">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>
                
                <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
                `

                forecastSection.querySelector("[data-forecast-list]").appendChild(itemList)

            }

            loading.style.display = "none"
            container.style.overflowY = "overlay"
            container.classList.add("fade-in")

        })

    })

}

export const error404 = function () {
    return errorContent.style.display = "flex"
}