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

module.exports = {
    "actividades": readJSON('actividades.json'),
    "camaras": readJSON('camaras.json'),
    "especies": readJSON('especies.json')
}