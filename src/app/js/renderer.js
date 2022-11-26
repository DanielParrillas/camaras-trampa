//* Data
const data = require('../../data/data')

const actividades = data.actividades
const camaras = data.camaras
const especies = data.especies

//* DOM Elements
const {
    selects, rellenarSelectCamaras, rellenarSelectEspecies, rellenarCheckBoxGroupActividades, quitarBlur, aplicarBlur, sections
} = require('../js/dom')

//*Class
class WildRecord {
    constructor(link, camara, fecha, hora, especie, sexo, actividades, cantidad, clima, temperatura, luna, humanos, observaciones) {
        this.link = link
        this.camara = camara
        this.fecha = fecha
        this.hora = hora
        this.especie = especie
        this.sexo = sexo
        this.actividades = actividades
        this.cantidad = cantidad
        this.clima = clima
        this.temperatura = temperatura
        this.luna = luna
        this.humanos = humanos
        this.observaciones = observaciones
    }
}

let registros = []

function iniciarApp() {
    console.log("%cAplicacion iniciada", "background: white; color: #212529")
    completarPreguntasConData()
    quitarBlur(sections.nav)
}

function completarPreguntasConData() {
    console.log("%c\tCompletando preguntas...", "background: white; color: #303746")
    rellenarSelectCamaras(camaras)
    rellenarSelectEspecies(especies)
    rellenarCheckBoxGroupActividades(actividades)
}

window.addEventListener('load', iniciarApp)