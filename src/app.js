const settings = require('../utils/settings');
const path = require('path');
const express = require('express');
const os = require('os');
const publicFolder = path.join(__dirname, '../public');
const appPort = settings.appPort

const app = express();

app.set('view engine', 'hbs');
app.use('/public', express.static(publicFolder));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    badUrl = req.url.toString();
    res.render('404', {'badUrl':badUrl});
})

const time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
    toStr: function(){
        return `[ ${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second} ]`;
    }
}

app.listen(appPort, () => {
    console.log('----------------------------------------------------------------');
    console.log(`--------------- Express web-server started ---------------------`);
    console.log(`--------------- Start time:`, time.toStr(), '--------------');
    console.log('----------------------------------------------------------------');
    console.log(`Possible URL to try: http://127.0.0.1:${appPort}`)
})