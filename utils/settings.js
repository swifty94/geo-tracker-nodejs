/*
 *      Some helper to get secured items from JSON and to be exported in final constants.
 */
const fs = require('fs');
const getJsonValue = (jsonKey) => {
    try {
        data =  JSON.parse(fs.readFileSync("./app.json").toString());
        return data[jsonKey];
    } catch (error) {
        console.log("No app.json found in the application directory.", error);
        return;
    }
}

const appPort = getJsonValue('APP_PORT');

module.exports = {
    appPort: appPort
}