//* Data
const data = require('../../data/data')

let dataActividades
let dataCamaras
let dataEspecies

//* DOM Elements
const {
    select, rellenarSelectCamaras, rellenarSelectEspecies, rellenarCheckBoxGroupActividades, quitarBlur, aplicarBlur, section, input, checkbox, button, capturarCheckBoxSeleccionados, crearAlerta, mostrarMensaje
} = require('../js/dom')

button.agregarRegistro.addEventListener('click', agregarRegistro)

//*Class
class WildRecord {
    constructor(link, camara, fecha, hora, especie, sexo, edad, actividades, cantidad, clima, temperatura, luna, humanos, observaciones) {
        this.link = link
        this.camara = camara
        this.fecha = fecha
        this.hora = hora
        this.especie = especie
        this.sexo = sexo
        this.edad = edad
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
    console.log("Iniciando app...")
    getData()
    completarPreguntasConData()
    console.log("%cAplicacion iniciada", "color: #f6c31c")
    quitarBlur()
}
function getData () {
    console.log("Cargando data...")
    dataActividades = data.actividades
    dataCamaras = data.camaras
    dataEspecies = data.especies
}

function completarPreguntasConData() {
    console.log("Completando preguntas...",)
    rellenarSelectCamaras(dataCamaras)
    rellenarSelectEspecies(dataEspecies)
    rellenarCheckBoxGroupActividades(dataActividades)
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
    edad = select.edad.value
    actividades = capturarCheckBoxSeleccionados(checkbox.actividades)
    cantidad = parseInt(input.cantidad.value)
    clima = select.clima.value
    temperatura = input.temperatura.value
    luna = select.luna.value
    humanos = capturarCheckBoxSeleccionados(checkbox.humanos)
    observaciones = input.observaciones.value

    registroActivo = new WildRecord(link, camara, fecha, hora, especie, sexo, edad, actividades, cantidad, clima, temperatura, luna, humanos, observaciones)
    
    console.log(registroActivo)
}

function comprobarRegistro() {
    /*if(registroActivo.link === "") {
        mostrarMensaje("Debes poner el link del video", section.newRecordSection)
        return
    }*/
    if(registroActivo.camara === "") {
        mostrarMensaje("Debes especificar una camara", section.newRecordSection)
        return
    }
    if(registroActivo.fecha === "") {
        mostrarMensaje("Debes poner una fecha", section.newRecordSection)
        return
    }
    if(registroActivo.hora === "") {
        mostrarMensaje("Debes indicar una hora", section.newRecordSection)
        return
    }
    if(registroActivo.especie === "") {
        mostrarMensaje("Debes seleccionar una especie de la lista", section.newRecordSection)
        return
    }
    if(registroActivo.sexo === "") {
        mostrarMensaje("Debes indicar el sexo de la especie")
        return
    }
    if(registroActivo.edad === "") {
        mostrarMensaje("Debes indicar la edad de la especie")
        return
    }
    if(registroActivo.actividades.length === 0) {
        mostrarMensaje("Debes seleccionar al menos 1 actividad")
        return
    }
    if(registroActivo.cantidad < 1 || isNaN(registroActivo.cantidad)) {
        mostrarMensaje("Debe describir al menos 1 especie")
        return
    }
    if(registroActivo.clima === "") {
        mostrarMensaje("Debes indicar el clima, observandolo como se encuentra en el video")
        return
    }
    if(registroActivo.temperatura === "") {
        mostrarMensaje("Debes indicar la temperatura, puedes verla en una esquina del video")
        return
    }
    if(registroActivo.luna === "") {
        mostrarMensaje("Debes seleccionar la fase en que esta la luna, puedes verla en una esquina del video")
        return
    }
}

window.addEventListener('load', iniciarApp)