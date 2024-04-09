/**
 * @license MIT
 * @fileoverview All module functions
 * @copyright Evanildo-Silva 2024 All rights reserved
 * @author Evanildo-Silva <evanildo.sf91@gmail.com>
 */

'use strict'

export const weekDayNames = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

export const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
]

/**
 * 
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Time shift from UTC in seconds
 * @returns {string} Date string. formate: "Domingo 10, Jan"
 */

export const getDate = function (dateUnix, timezone) {
    const date = new Date((dateUnix + timezone) * 1000)
    const localWeekDay = weekDayNames[date.getUTCDay()]
    const localMonth = monthNames[date.getUTCMonth()]

    return `${localWeekDay} ${date.getUTCDate().toString().padStart(2, '0')}, ${localMonth}`
}

/**
 * 
 * @param {number} timeUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @returns {string} Time string. formate: HH:MM 24h
 */

export const getTime = function (timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

/**
 * 
 * @param {number} mps Metter per seconds
 * @returns {number} Kilometer per hours
 */

export const mps_to_kmh = function (mps) {
    const mph = mps * 3600
    return mph / 1000
}

export const aqiText = {
    1: {
        level: "Otimo",
        message: "A qualidade do ar é considerada satisfatória, a poluição atmosférica representa pouco ou nenhum risco."
    },
    2: {
        level: "Boa",
        message: "A qualidade do ar é aceitável; no entanto, para alguns poluentes, pode haver um problema moderado de saúde para um número muito pequeno de pessoas que são sensíveis à poluição atmosférica."
    },
    3: {
        level: "Moderada",
        message: "Membros de grupos sensíveis, podem sofrer efeitos na saúde. O público em geral provavelmente não será afetado."
    },
    4: {
        level: "Ruim",
        message: "Todos podem começar a sentir efeitos na saúde; membros de grupos sensíveis podem sofrer efeitos mais graves para a saúde."
    },
    5: {
        level: "Muito ruim",
        message: "Perigo de saúde sobre condições de emergência. Toda a população tem maior probabilidade de ser afetada."
    },
}