//* Data
const data = require('../../data/data')

const actividades = data.actividades
const camaras = data.camaras
const especies = data.especies

//* DOM Elements
const {
    selects, rellenarSelectCamaras, rellenarSelectEspecies, rellenarCheckBoxGroupActividades
} = require('../js/dom')

let registros = []

function iniciarApp() {
    console.log("%cAplicacion iniciada", "background: white; color: #212529")
    completarPreguntasConData()
}

function completarPreguntasConData() {
    console.log("%c\tCompletando preguntas...", "background: white; color: #303746")
    rellenarSelectCamaras(camaras)
    rellenarSelectEspecies(especies)
    rellenarCheckBoxGroupActividades(actividades)
}

window.addEventListener('load', iniciarApp)