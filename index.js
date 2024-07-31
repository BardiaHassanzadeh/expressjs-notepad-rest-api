require('dotenv').config()
const express = require('express')
const app = express()
const Database = require('./Configs/Database')
const fs = require('fs');
const path = require('path');
const BodyParser = require('body-parser');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const database = Database.connect()
// Read directory
const dirPath = path.join(__dirname, 'Routes');
fs.readdirSync(dirPath).forEach(file => {
    const filePath = "./Routes/" + file.replace('.js', '')
    const route = require(filePath)
    app.use(process.env.API_ROUTE_PREFIX + '/' + route.ROUTE_NAME, route.router)
});

app.listen(3000, () => console.log('Server started and listening on port 3000'))