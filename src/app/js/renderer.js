//* Data
const data = require('../../data/data')

const DataActividades = data.actividades
const DataCamaras = data.camaras
const DataEspecies = data.especies

//* DOM Elements
const {
    select, rellenarSelectCamaras, rellenarSelectEspecies, rellenarCheckBoxGroupActividades, quitarBlur, aplicarBlur, section, input, checkbox, button, capturarCheckBoxSeleccionados, crearAlerta, lanzarMensaje
} = require('../js/dom')

button.agregarRegistro.addEventListener('click', agregarRegistro)

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

    setId () {
        this.id = Math.random()
    }
}

let registros = []
let registroActivo

function iniciarApp() {
    console.log("%cAplicacion iniciada", "background: white; color: #212529")
    completarPreguntasConData()
    quitarBlur(section.nav)
}

function completarPreguntasConData() {
    console.log("%c\tCompletando preguntas...", "background: white; color: #303746")
    rellenarSelectCamaras(DataCamaras)
    rellenarSelectEspecies(DataEspecies)
    rellenarCheckBoxGroupActividades(DataActividades)
}

function agregarRegistro() {
    capturarDatos()
    comprobarRegistro()
}

function capturarDatos() {
    link = input.url.value
    camara = select.camara.value
    fecha = input.date.value
    hora = input.time.value
    especie = select.especie.value
    sexo = select.sexo.value
    actividades = capturarCheckBoxSeleccionados(checkbox.actividades)
    cantidad = input.cantidad.value
    clima = select.clima.value
    temperatura = select.clima.value
    luna = select.luna.value
    humanos = capturarCheckBoxSeleccionados(checkbox.humanos)
    observaciones = input.observaciones.value

    registroActivo = new WildRecord(link, camara, fecha, hora, especie, sexo, actividades, cantidad, clima, temperatura, luna, humanos, observaciones)
    
    console.log(registroActivo)
}

function comprobarRegistro() {
    //?registroActivo.link
    console.log(registroActivo.link)
    if(registroActivo.link === "" || registroActivo.link === null) {
        lanzarMensaje("Debes especificar una cantidad")
        return
    }
}

window.addEventListener('load', iniciarApp)