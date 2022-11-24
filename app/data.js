//* Data
const fs = require('fs')
const path = require('path')

let actividades = null
let camaras = null
let especies = null

const readJSON = (fileJSON) => {
    const pathJSON = path.join(__dirname, `./data/${fileJSON}`)
    const data = fs.readFileSync(pathJSON, 'utf-8')
    return data
};

const writeJSON = (data) => {
    fs.writeFileSync(pathJSON, data)
};

actividades = readJSON('actividades.json')
camaras = readJSON('camaras.json')
especies = readJSON('especies.json')

module.exports = {
    "actividades": actividades,
    "camaras": camaras,
    "especies": especies
}