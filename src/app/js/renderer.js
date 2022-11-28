//* Data
const data = require('../../data/data')

let dataActividades
let dataCamaras
let dataEspecies

//* DOM Elements
const {
    select, rellenarSelectCamaras, rellenarSelectEspecies, rellenarCheckBoxGroupActividades, quitarBlur, aplicarBlur, section, input, checkbox, button, capturarCheckBoxSeleccionados, crearAlerta, mostrarMensaje, cerrarSectionRegistro, rellenarTabla, obtenerIndex, rellenarFormulario, limpiarFormulario
} = require('../js/dom')

button.agregarRegistro.addEventListener('click', agregarRegistro)

button.buttonPapelera.addEventListener('click', () => {
    actualizarTabla('eliminados')
})
button.buttonRegistros.addEventListener('click', () => {
    actualizarTabla()
})

section.tableRegistros.addEventListener('click', (e) => {
    let index
    if(e.target.value === "borrar-registro") {
        index = obtenerIndex(e.target)
        borrarRegistro(index)
    } else if (e.target.value === "editar-registro") {
        index = obtenerIndex(e.target)
        editarRegistro(index)
    } else if (e.target.value === "restaurar-registro") {
        index = obtenerIndex(e.target)
        restaurarRegistro(index)
    }
})

let registros = []
let registroActivo

//*Class
class WildRecord {
    constructor(link, video, camara, fecha, hora, especie, sexo, edad, actividades, cantidad, clima, temperatura, luna, humanos, observaciones) {
        this.link = link
        this.video = video
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
        this.eliminado = false
    }

    setId () {
        this.id = registros.length
    }
}

function iniciarApp() {
    console.log("Iniciando app...")
    getData()
    console.log("Cargando registros locales...")
    cargarRegistrosLocales()
    completarPreguntasConData()
    actualizarTabla()
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
    if (registroValido()) {
        registroActivo.setId()
        registros.push(registroActivo)
        guardarRegistrosEnLocal()
        console.log('%c\tSe agrego un nuevo registro %c',"color:#3BACD9",registros.length)
        registroActivo = null
        limpiarFormulario()
        cerrarSectionRegistro()
        //limpiarSectionRegistro()
        actualizarTabla()
    }
}

function actualizarTabla(filtro = 'all') {
    let registrosValidos
    if (filtro === 'all') {
        registrosValidos = registros.filter(registro => registro.eliminado === false)
    } else if (filtro === 'eliminados') {
        registrosValidos = registros.filter(registro => registro.eliminado === true)
    }
    rellenarTabla(registrosValidos, filtro)
}

function borrarRegistro(index) {
    registros[index].eliminado = true
    guardarRegistrosEnLocal()
    console.log("Se borro el registro ", index)
    actualizarTabla()
}
function restaurarRegistro(index) {
    registros[index].eliminado = false
    guardarRegistrosEnLocal()
    console.log("Se restauro el registro ", index)
    actualizarTabla('eliminados')
}

function editarRegistro(index) {
    registroActivo = registros[index]
    rellenarFormulario(registroActivo)
    console.log("Se editara el registro ", index)
}

function capturarDatos() {
    link = input.url.value
    video = input.video.value
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
    observaciones = input.observaciones.value;

    registroActivo = new WildRecord(link, video, camara, fecha, hora, especie, sexo, edad, actividades, cantidad, clima, temperatura, luna, humanos, observaciones)
}

function registroValido() {
    /*if(registroActivo.link === "") {
        mostrarMensaje("Debes poner el link del video", section.newRecordSection)
        return
    }*/
    if(registroActivo.video === "") {
        mostrarMensaje("Debes poner el nombre del video", section.newRecordSection)
        return
    }
    if(registroActivo.camara === "") {
        mostrarMensaje("Debes especificar una camara", section.newRecordSection)
        return false
    }
    if(registroActivo.fecha === "") {
        mostrarMensaje("Debes poner una fecha", section.newRecordSection)
        return false
    }
    if(registroActivo.hora === "") {
        mostrarMensaje("Debes indicar una hora", section.newRecordSection)
        return false
    }
    if(registroActivo.especie === "") {
        mostrarMensaje("Debes seleccionar una especie de la lista", section.newRecordSection)
        return false
    }
    if(registroActivo.sexo === "") {
        mostrarMensaje("Debes indicar el sexo de la especie")
        return false
    }
    if(registroActivo.edad === "") {
        mostrarMensaje("Debes indicar la edad de la especie")
        return false
    }
    if(registroActivo.actividades.length === 0) {
        mostrarMensaje("Debes seleccionar al menos 1 actividad")
        return false
    }
    if(registroActivo.cantidad < 1 || isNaN(registroActivo.cantidad)) {
        mostrarMensaje("Debe describir al menos 1 especie")
        return false
    }
    if(registroActivo.clima === "") {
        mostrarMensaje("Debes indicar el clima, observandolo como se encuentra en el video")
        return false
    }
    if(registroActivo.temperatura === "") {
        mostrarMensaje("Debes indicar la temperatura, puedes verla en una esquina del video")
        return false
    }
    if(registroActivo.luna === "") {
        mostrarMensaje("Debes seleccionar la fase en que esta la luna, puedes verla en una esquina del video")
        return false
    }
    return true
}

function cargarRegistrosLocales () {
    try {
        registros = Array.from(JSON.parse(localStorage.getItem('wildRecords')))
    } catch(e) {
        console.error("No se puedo recuperar los registros")
        console.error(e)
        registros = []
    }
    console.log("Registros en local:")
    console.log(registros)
}

function guardarRegistrosEnLocal () {
    console.log("%cSe guardaron los registros en local", "color: #1ac888")
    localStorage.setItem("wildRecords", JSON.stringify(registros))
}

window.addEventListener('load', iniciarApp)