//* Data
const fs = require('fs')
const path = require('path')

const readJSON = (fileJSON) => {
    const pathJSON = path.join(__dirname, `./json/${fileJSON}`)
    const data = fs.readFileSync(pathJSON, 'utf-8')
    return data
};

const writeJSON = (data) => {
    fs.writeFileSync(pathJSON, data)
};

const actividadesJSON = JSON.parse(readJSON('actividades.json'))
const camarasJSON = JSON.parse(readJSON('camaras.json'))
const especiesJSON = JSON.parse(readJSON('especies.json'))

module.exports = {
    "actividades": actividadesJSON,
    "camaras": camarasJSON,
    "especies": especiesJSON
}