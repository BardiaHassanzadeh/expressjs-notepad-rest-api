require('dotenv').config()
const mongoose = require('mongoose')

const connect = async (app) => {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
    const database = mongoose.connection

    database.on('error', (error) => {
        app.response.status(500).json({ message: 'Database connection failed' })
    })

    return database;
}

module.exports.connect = connect