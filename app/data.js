//* Data
const fs = require('fs')
const path = require('path')

const readJSON = () => {
    const pathJSON = path.join(__dirname, './data/data.json')
    const data = fs.readFileSync(pathJSON, 'utf-8')
    return data
};

const writeJSON = (data) => {
    fs.writeFileSync(pathJSON, data)
};

let data = readJSON

module.exports = {
    "data": data
}